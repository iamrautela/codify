'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getWebsiteById } from '@/lib/api/website-generator'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function PreviewPage() {
  const params = useParams()
  const [website, setWebsite] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWebsite = async () => {
      if (!params.id) return

      try {
        const data = await getWebsiteById(params.id as string)
        setWebsite(data)
      } catch (error) {
        console.error('Error loading website:', error)
        setError('Website not found or you do not have permission to view it.')
      } finally {
        setLoading(false)
      }
    }

    loadWebsite()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading website...</p>
        </div>
      </div>
    )
  }

  if (error || !website) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">Website Not Found</h1>
          <p className="text-muted-foreground">{error}</p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${website.title}</title>
    <style>
${website.css_content}
    </style>
</head>
<body>
${website.html_content}
${website.js_content ? `<script>\n${website.js_content}\n</script>` : ''}
</body>
</html>`

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur border-b border-border/40 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="font-semibold">{website.title}</h1>
              <p className="text-sm text-muted-foreground">{website.description}</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" asChild>
            <a 
              href={`data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
            </a>
          </Button>
        </div>
      </div>

      {/* Website Preview */}
      <iframe
        srcDoc={fullHtml}
        className="w-full h-[calc(100vh-80px)] border-0"
        title={`Preview of ${website.title}`}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  )
}