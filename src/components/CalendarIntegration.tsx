import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, CheckCircle, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";

interface CalendarIntegrationProps {
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
}

export const CalendarIntegration = ({ isConnected, onConnectionChange }: CalendarIntegrationProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(isConnected ? new Date() : null);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate OAuth flow
    setTimeout(() => {
      onConnectionChange(true);
      setLastSync(new Date());
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    onConnectionChange(false);
    setLastSync(null);
  };

  const handleSync = async () => {
    setIsConnecting(true);
    // Simulate sync
    setTimeout(() => {
      setLastSync(new Date());
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <Card className="border-academic-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-academic-primary" />
          Calendar Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Connect your Google Calendar to enable proactive stress monitoring and AI-powered insights.
              </AlertDescription>
            </Alert>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Google Calendar</h3>
                <p className="text-sm text-muted-foreground">
                  Securely sync your academic events for personalized support
                </p>
              </div>
              <Button 
                onClick={handleConnect} 
                disabled={isConnecting}
                className="bg-academic-primary hover:bg-academic-primary/90"
              >
                {isConnecting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Connect Calendar
                  </>
                )}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• We only read calendar events with academic keywords</p>
              <p>• Your data is encrypted and never shared</p>
              <p>• You can disconnect at any time</p>
            </div>
          </>
        ) : (
          <>
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Calendar successfully connected! AI monitoring is now active.
              </AlertDescription>
            </Alert>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Connected
                  </Badge>
                  <span className="text-sm font-medium">Google Calendar</span>
                </div>
                {lastSync && (
                  <p className="text-xs text-muted-foreground">
                    Last synced: {lastSync.toLocaleString()}
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSync}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-3 space-y-2">
              <h4 className="text-sm font-medium">Active Features:</h4>
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Automatic event stress analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Proactive mental health alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Personalized study recommendations</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};