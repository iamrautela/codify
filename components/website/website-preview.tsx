'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Eye, 
  Code, 
  Download, 
  Share, 
  Edit, 
  Trash2,
  ExternalLink,
  Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface WebsitePreviewProps {
  website: {
    id: string
    title: string
    description: string
    html_content: string
    css_content: string
    js_content?: string | null
    is_public: boolean
    created_at: string
    prompts?: {
      prompt_text: string
      created_at: string
    }
  }
  onEdit?: (websiteId: string) => void
  onDelete?: (websiteId: string) => void
  onTogglePublic?: (websiteId: string, isPublic: boolean) => void
}

export function WebsitePreview({ 
  website, 
  onEdit, 
  onDelete, 
  onTogglePublic 
}: WebsitePreviewProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')
  const [codeView, setCodeView] = useState<'html' | 'css' | 'js'>('html')

  const handleDownload = () => {
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

    const blob = new Blob([fullHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${website.title.toLowerCase().replace(/\s+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-xl">{website.title}</CardTitle>
              {website.is_public && (
                <Badge variant="secondary" className="text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  Public
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{website.description}</p>
            <p className="text-xs text-muted-foreground">
              Created {formatDate(website.created_at)}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === 'preview' ? 'code' : 'preview')}
            >
              {viewMode === 'preview' ? (
                <>
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            
            {onTogglePublic && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onTogglePublic(website.id, !website.is_public)}
              >
                <Share className="w-4 h-4 mr-2" />
                {website.is_public ? 'Make Private' : 'Make Public'}
              </Button>
            )}
            
            <Button variant="outline" size="sm" asChild>
              <a 
                href={`/preview/${website.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open
              </a>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(website.id)}>
                <Edit className="w-4 h-4" />
              </Button>
            )}
            
            {onDelete && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onDelete(website.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {viewMode === 'preview' ? (
          <div className="border rounded-lg overflow-hidden bg-white">
            <iframe
              srcDoc={`
                <style>${website.css_content}</style>
                ${website.html_content}
                ${website.js_content ? `<script>${website.js_content}</script>` : ''}
              `}
              className="w-full h-96 border-0"
              title={`Preview of ${website.title}`}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Code View Tabs */}
            <div className="flex items-center space-x-2">
              <Button
                variant={codeView === 'html' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCodeView('html')}
              >
                HTML
              </Button>
              <Button
                variant={codeView === 'css' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCodeView('css')}
              >
                CSS
              </Button>
              {website.js_content && (
                <Button
                  variant={codeView === 'js' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCodeView('js')}
                >
                  JavaScript
                </Button>
              )}
            </div>

            {/* Code Content */}
            <div className="border rounded-lg overflow-hidden">
              <pre className="p-4 text-sm overflow-x-auto bg-muted/50 max-h-96">
                <code className={cn(
                  "language-" + (codeView === 'js' ? 'javascript' : codeView)
                )}>
                  {codeView === 'html' && website.html_content}
                  {codeView === 'css' && website.css_content}
                  {codeView === 'js' && (website.js_content || '// No JavaScript code')}
                </code>
              </pre>
            </div>
          </div>
        )}

        {/* Original Prompt */}
        {website.prompts && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Original Prompt:</h4>
            <p className="text-sm text-muted-foreground italic">
              "{website.prompts.prompt_text}"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}