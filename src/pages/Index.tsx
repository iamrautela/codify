
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code2, 
  Zap, 
  Palette, 
  Globe, 
  Sparkles, 
  Play, 
  Eye,
  FileCode,
  Cpu,
  Brain,
  Rocket,
  Star,
  ArrowRight,
  MonitorSpeaker
} from "lucide-react";
import Header from "@/components/Header";
import PromptInterface from "@/components/PromptInterface";
import CodePreview from "@/components/CodePreview";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "builder">("landing");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleStartBuilding = () => {
    setCurrentView("builder");
  };

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code);
  };

  if (currentView === "builder") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-codify-500 to-electric-500 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">AI Builder</h1>
                  <p className="text-muted-foreground">Describe your app and watch it come to life</p>
                </div>
              </div>
              <PromptInterface onCodeGenerated={handleCodeGenerated} />
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MonitorSpeaker className="h-5 w-5" />
                  Live Preview
                </h2>
                <Tabs defaultValue="preview" className="w-auto">
                  <TabsList className="glass">
                    <TabsTrigger value="preview" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="flex items-center gap-2">
                      <FileCode className="h-4 w-4" />
                      Code
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="mt-4">
                    <Card className="glass h-[500px] p-6">
                      <div className="w-full h-full bg-white rounded-lg shadow-inner flex items-center justify-center">
                        {generatedCode ? (
                          <div className="text-center space-y-4">
                            <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-codify-500 to-electric-500 flex items-center justify-center animate-pulse">
                              <Sparkles className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Your App is Ready!</h3>
                              <p className="text-gray-600 text-sm">Preview will render here</p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center space-y-4">
                            <div className="h-16 w-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                              <Play className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Ready to Preview</h3>
                              <p className="text-gray-600 text-sm">Generate code to see your app come to life</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  </TabsContent>
                  <TabsContent value="code" className="mt-4">
                    <CodePreview code={generatedCode} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <Badge variant="secondary" className="glass mb-6 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Development Platform
          </Badge>
          
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Build Apps with
            <span className="text-gradient block mt-2">Natural Language</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into fully functional web applications using AI. 
            No coding required - just describe what you want to build.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-codify-500 to-electric-500 hover:from-codify-600 hover:to-electric-600 text-white px-8 py-3 text-lg animate-glow-pulse"
              onClick={handleStartBuilding}
            >
              Start Building
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="glass border-white/20 hover:bg-white/5 px-8 py-3 text-lg"
            >
              Watch Demo
              <Play className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-electric-400" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="h-4 w-4 text-codify-400" />
              <span>Deploy Instantly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-6">
              Everything you need to build
              <span className="text-gradient"> modern apps</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI models and modern development tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Brain}
              title="AI Code Generation"
              description="Advanced language models that understand your requirements and generate production-ready code"
              gradient="from-codify-500 to-codify-600"
            />
            
            <FeatureCard 
              icon={Eye}
              title="Live Preview"
              description="See your application come to life in real-time as the AI generates and updates your code"
              gradient="from-electric-500 to-electric-600"
            />
            
            <FeatureCard 
              icon={Cpu}
              title="Safe Sandboxes"
              description="Isolated execution environments powered by Docker ensure your code runs safely and reliably"
              gradient="from-purple-500 to-purple-600"
            />
            
            <FeatureCard 
              icon={Palette}
              title="Modern UI Components"
              description="Beautiful, responsive components built with Tailwind CSS and modern design principles"
              gradient="from-pink-500 to-pink-600"
            />
            
            <FeatureCard 
              icon={Globe}
              title="Instant Deployment"
              description="Deploy your applications to the web with a single click and share them with the world"
              gradient="from-green-500 to-green-600"
            />
            
            <FeatureCard 
              icon={Code2}
              title="Export & Customize"
              description="Export your generated code and continue development in your favorite IDE with full control"
              gradient="from-orange-500 to-orange-600"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="glass glow p-12 text-center max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <h2 className="text-4xl font-bold mb-6">
              Ready to build your next
              <span className="text-gradient"> big idea?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building faster with AI
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-codify-500 to-electric-500 hover:from-codify-600 hover:to-electric-600 text-white px-12 py-4 text-lg"
              onClick={handleStartBuilding}
            >
              Get Started Free
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • Start building in seconds
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Index;
