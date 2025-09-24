import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Brain, Calendar } from "lucide-react";
import { StudentDashboard } from "@/components/StudentDashboard";
import { MentorDashboard } from "@/components/MentorDashboard";

const Index = () => {
  const [activeView, setActiveView] = useState<"home" | "student" | "mentor">("home");

  if (activeView === "student") {
    return <StudentDashboard />;
  }

  if (activeView === "mentor") {
    return <MentorDashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-academic-primary/10 to-academic-secondary/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <Badge variant="outline" className="text-academic-primary border-academic-primary mb-4">
              <Brain className="mr-2 h-4 w-4" />
              Emotional Guardian System
            </Badge>
          </div>
          <h1 className="mb-6 text-5xl font-bold text-foreground">
            Mindscape
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            Proactive mental health support through AI-powered academic calendar integration. 
            Transform reactive care into predictive emotional guardianship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-academic-primary hover:bg-academic-primary/90"
              onClick={() => setActiveView("student")}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Student Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-academic-secondary text-academic-secondary hover:bg-academic-secondary/10"
              onClick={() => setActiveView("mentor")}
            >
              <Users className="mr-2 h-5 w-5" />
              Mentor Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-powered system that transforms academic stress management from reactive to proactive care
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-academic-primary mx-auto mb-4" />
                <CardTitle>Secure Calendar Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  One-time secure flow to connect Google Calendar with encrypted token storage and OAuth protection
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Brain className="h-12 w-12 text-academic-secondary mx-auto mb-4" />
                <CardTitle>Predictive Stress Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI analyzes academic events to predict stress levels and provide personalized coping strategies
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-academic-primary mx-auto mb-4" />
                <CardTitle>Mentor Insights Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time overview of student stress levels and upcoming high-impact academic events
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* System Architecture */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-academic-primary text-white rounded-full flex items-center justify-center mx-auto font-bold">
                1
              </div>
              <h3 className="font-semibold">Calendar Sync</h3>
              <p className="text-sm text-muted-foreground">Secure OAuth connection to academic calendar</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-academic-primary text-white rounded-full flex items-center justify-center mx-auto font-bold">
                2
              </div>
              <h3 className="font-semibold">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">Event analysis for stress prediction and scoring</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-academic-primary text-white rounded-full flex items-center justify-center mx-auto font-bold">
                3
              </div>
              <h3 className="font-semibold">Proactive Alerts</h3>
              <p className="text-sm text-muted-foreground">Personalized interventions before stress peaks</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-academic-primary text-white rounded-full flex items-center justify-center mx-auto font-bold">
                4
              </div>
              <h3 className="font-semibold">Mentor Support</h3>
              <p className="text-sm text-muted-foreground">Dashboard insights for human intervention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
