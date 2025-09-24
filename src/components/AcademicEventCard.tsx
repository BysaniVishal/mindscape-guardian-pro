import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Brain, AlertTriangle, CheckCircle, Zap } from "lucide-react";

interface AcademicEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  stressScore: number;
  analysisReason: string;
}

interface AcademicEventCardProps {
  event: AcademicEvent;
}

export const AcademicEventCard = ({ event }: AcademicEventCardProps) => {
  const getStressInfo = (score: number) => {
    if (score >= 8) return { 
      level: "Critical", 
      color: "destructive", 
      icon: AlertTriangle,
      bgColor: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
    };
    if (score >= 6) return { 
      level: "High", 
      color: "secondary", 
      icon: Zap,
      bgColor: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800" 
    };
    if (score >= 4) return { 
      level: "Moderate", 
      color: "outline", 
      icon: Clock,
      bgColor: "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
    };
    return { 
      level: "Low", 
      color: "outline", 
      icon: CheckCircle,
      bgColor: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
    };
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 0) return "Past";
    return `${diffDays} days`;
  };

  const stressInfo = getStressInfo(event.stressScore);
  const StressIcon = stressInfo.icon;
  const daysUntil = getDaysUntil(event.startDate);

  return (
    <Card className={`transition-all hover:shadow-md ${stressInfo.bgColor}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Calendar className="h-4 w-4 text-academic-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base leading-tight">{event.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{formatDateTime(event.startDate)}</span>
                  <Badge variant="outline" className="text-xs">
                    {daysUntil}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-7">
              <StressIcon className="h-4 w-4 text-current" />
              <Badge variant={stressInfo.color as any} className="text-xs">
                {stressInfo.level} Stress ({event.stressScore}/10)
              </Badge>
            </div>

            <div className="ml-7">
              <div className="rounded-lg bg-muted/50 p-3 text-sm">
                <div className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-academic-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-academic-secondary mb-1">AI Analysis:</p>
                    <p className="text-muted-foreground">{event.analysisReason}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-4">
            <Button variant="outline" size="sm" className="text-xs">
              Get Support
            </Button>
            {event.stressScore >= 7 && (
              <Button variant="default" size="sm" className="text-xs bg-academic-secondary hover:bg-academic-secondary/90">
                <Brain className="mr-1 h-3 w-3" />
                Coping Tips
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};