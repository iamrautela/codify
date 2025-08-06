import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface GenerateWebsiteRequest {
  prompt: string
  userId?: string
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { prompt, userId }: GenerateWebsiteRequest = await req.json()

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create prompt record
    const { data: promptData, error: promptError } = await supabaseClient
      .from('prompts')
      .insert({
        user_id: userId || null,
        prompt_text: prompt,
        status: 'processing'
      })
      .select()
      .single()

    if (promptError) {
      console.error('Error creating prompt:', promptError)
      return new Response(
        JSON.stringify({ error: 'Failed to create prompt record' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate website using OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert web developer. Generate a complete, modern, responsive website based on the user's prompt. 

IMPORTANT: Return your response as a JSON object with this exact structure:
{
  "title": "Website Title",
  "description": "Brief description of the website",
  "html": "Complete HTML content with proper structure",
  "css": "Complete CSS with modern styling, responsive design, and beautiful aesthetics",
  "js": "JavaScript code if needed (optional)"
}

Requirements:
- Use modern HTML5 semantic elements
- Include responsive CSS with mobile-first approach
- Use modern CSS features (flexbox, grid, custom properties)
- Include beautiful typography and color schemes
- Add hover effects and smooth transitions
- Make it production-ready and visually appealing
- Include proper meta tags and accessibility features
- Use a cohesive design system with consistent spacing and colors

Do not include any explanations or additional text outside the JSON response.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      })
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.statusText}`)
    }

    const openaiData: OpenAIResponse = await openaiResponse.json()
    const generatedContent = openaiData.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('No content generated from OpenAI')
    }

    // Parse the generated content as JSON
    let websiteData
    try {
      websiteData = JSON.parse(generatedContent)
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      // Fallback: create a simple website structure
      websiteData = {
        title: 'Generated Website',
        description: 'A website generated from your prompt',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
</head>
<body>
    <div class="container">
        <h1>Your Website</h1>
        <p>Based on your prompt: "${prompt}"</p>
        <p>We're working on generating a more detailed website. Please try again!</p>
    </div>
</body>
</html>`,
        css: `
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}
.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
h1 {
    color: #333;
    text-align: center;
}`,
        js: ''
      }
    }

    // Save generated website to database
    const { data: websiteData: savedWebsite, error: websiteError } = await supabaseClient
      .from('generated_websites')
      .insert({
        prompt_id: promptData.id,
        user_id: userId || null,
        title: websiteData.title || 'Generated Website',
        description: websiteData.description || '',
        html_content: websiteData.html || '',
        css_content: websiteData.css || '',
        js_content: websiteData.js || '',
        is_public: false
      })
      .select()
      .single()

    if (websiteError) {
      console.error('Error saving website:', websiteError)
      return new Response(
        JSON.stringify({ error: 'Failed to save generated website' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Update prompt status to completed
    await supabaseClient
      .from('prompts')
      .update({ status: 'completed' })
      .eq('id', promptData.id)

    return new Response(
      JSON.stringify({
        success: true,
        promptId: promptData.id,
        websiteId: savedWebsite.id,
        website: {
          title: websiteData.title,
          description: websiteData.description,
          html: websiteData.html,
          css: websiteData.css,
          js: websiteData.js
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in generate-website function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})