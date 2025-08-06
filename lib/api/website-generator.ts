import { supabase } from '@/lib/supabase/client'

export interface GenerateWebsiteRequest {
  prompt: string
  userId?: string
}

export interface GeneratedWebsite {
  id: string
  title: string
  description: string
  html: string
  css: string
  js?: string
  promptId: string
}

export interface GenerateWebsiteResponse {
  success: boolean
  promptId: string
  websiteId: string
  website: {
    title: string
    description: string
    html: string
    css: string
    js: string
  }
  error?: string
}

export const generateWebsite = async (request: GenerateWebsiteRequest): Promise<GenerateWebsiteResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-website', {
      body: request
    })

    if (error) {
      throw new Error(error.message || 'Failed to generate website')
    }

    return data
  } catch (error) {
    console.error('Error generating website:', error)
    throw error
  }
}

export const getUserWebsites = async (userId: string) => {
  const { data, error } = await supabase
    .from('generated_websites')
    .select(`
      *,
      prompts (
        prompt_text,
        created_at
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getWebsiteById = async (websiteId: string) => {
  const { data, error } = await supabase
    .from('generated_websites')
    .select(`
      *,
      prompts (
        prompt_text,
        created_at
      )
    `)
    .eq('id', websiteId)
    .single()

  if (error) throw error
  return data
}

export const updateWebsite = async (websiteId: string, updates: Partial<{
  title: string
  description: string
  html_content: string
  css_content: string
  js_content: string
  is_public: boolean
}>) => {
  const { data, error } = await supabase
    .from('generated_websites')
    .update(updates)
    .eq('id', websiteId)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteWebsite = async (websiteId: string) => {
  const { error } = await supabase
    .from('generated_websites')
    .delete()
    .eq('id', websiteId)

  if (error) throw error
}