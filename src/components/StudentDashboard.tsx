import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Brain, TrendingUp, Clock } from "lucide-react";
import { CalendarIntegration } from "./CalendarIntegration";
import { AcademicEventCard } from "./AcademicEventCard";

interface AcademicEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  stressScore: number;
  analysisReason: string;
}

export const StudentDashboard = () => {
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [upcomingEvents] = useState<AcademicEvent[]>([
    {
      id: "1",
      title: "Final Exam - Data Structures",
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      stressScore: 8,
      analysisReason: "Major exam with significant impact on grade"
    },
    {
      id: "2", 
      title: "Project Presentation - Web Development",
      startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      stressScore: 6,
      analysisReason: "Public presentation component increases anxiety"
    }
  ]);

  const getStressLevel = (score: number) => {
    if (score >= 7) return { level: "high", color: "stress-high" };
    if (score >= 4) return { level: "medium", color: "stress-medium" };
    return { level: "low", color: "stress-low" };
  };

  const averageStress = upcomingEvents.length > 0 
    ? Math.round(upcomingEvents.reduce((sum, event) => sum + event.stressScore, 0) / upcomingEvents.length)
    : 0;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Academic Dashboard</h1>
            <p className="text-muted-foreground">Monitor your academic stress and upcoming events</p>
          </div>
          <Badge variant="outline" className="text-academic-primary border-academic-primary">
            <Brain className="mr-2 h-4 w-4" />
            Emotional Guardian Active
          </Badge>
        </div>

        {/* Calendar Integration */}
        <CalendarIntegration 
          isConnected={isCalendarConnected}
          onConnectionChange={setIsCalendarConnected}
        />

        {/* Stress Overview */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Stress Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageStress}/10</div>
              <Badge 
                variant="outline" 
                className={`mt-2 border-${getStressLevel(averageStress).color} text-${getStressLevel(averageStress).color}`}
              >
                {getStressLevel(averageStress).level.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingEvents.length}</div>
              <p className="text-xs text-muted-foreground">Next 2 weeks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time to Next Event</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 days</div>
              <p className="text-xs text-muted-foreground">Project Presentation</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-academic-primary" />
              Upcoming Academic Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <AcademicEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No upcoming events found</p>
                <p className="text-sm text-muted-foreground">Connect your calendar to see academic events</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="border-academic-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-academic-secondary" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg bg-muted p-4">
                <p className="font-medium text-sm">Stress Management Tip</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You have a high-stress event coming up. Consider taking 10-minute breaks every hour while studying.
                </p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="font-medium text-sm">Study Schedule</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your calendar, I recommend starting exam preparation 2 days earlier than planned.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};