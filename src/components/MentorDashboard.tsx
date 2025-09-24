import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, AlertTriangle, MessageCircle, Search, TrendingUp, Calendar } from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  averageStress: number;
  upcomingEvents: number;
  lastActive: string;
  highStressEvents: Array<{
    title: string;
    date: Date;
    stressScore: number;
  }>;
}

export const MentorDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      averageStress: 7,
      upcomingEvents: 3,
      lastActive: "2 hours ago",
      highStressEvents: [
        { title: "Final Exam - Calculus III", date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), stressScore: 9 },
        { title: "Thesis Defense", date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), stressScore: 8 }
      ]
    },
    {
      id: "2", 
      name: "Marcus Chen",
      email: "marcus.c@university.edu",
      averageStress: 4,
      upcomingEvents: 2,
      lastActive: "1 day ago",
      highStressEvents: [
        { title: "Group Project Presentation", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), stressScore: 6 }
      ]
    },
    {
      id: "3",
      name: "Emily Rodriguez", 
      email: "emily.r@university.edu",
      averageStress: 8,
      upcomingEvents: 4,
      lastActive: "30 minutes ago",
      highStressEvents: [
        { title: "Midterm Exam - Organic Chemistry", date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), stressScore: 9 },
        { title: "Research Paper Due", date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), stressScore: 7 }
      ]
    }
  ]);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStressLevel = (score: number) => {
    if (score >= 7) return { level: "HIGH", color: "destructive", bgColor: "bg-red-50 dark:bg-red-950" };
    if (score >= 4) return { level: "MEDIUM", color: "secondary", bgColor: "bg-yellow-50 dark:bg-yellow-950" };
    return { level: "LOW", color: "secondary", bgColor: "bg-green-50 dark:bg-green-950" };
  };

  const highStressStudents = students.filter(student => student.averageStress >= 7);
  const totalEvents = students.reduce((sum, student) => sum + student.upcomingEvents, 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mentor Dashboard</h1>
            <p className="text-muted-foreground">Monitor student well-being and academic stress</p>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="text-academic-primary border-academic-primary">
              <Users className="mr-2 h-4 w-4" />
              {students.length} Students
            </Badge>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Stress Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{highStressStudents.length}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEvents}</div>
              <p className="text-xs text-muted-foreground">Next 2 weeks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Stress Level</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(students.reduce((sum, s) => sum + s.averageStress, 0) / students.length)}/10
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Student List */}
        <div className="grid gap-4">
          {filteredStudents.map((student) => {
            const stressInfo = getStressLevel(student.averageStress);
            
            return (
              <Card key={student.id} className={`transition-colors hover:shadow-md ${stressInfo.bgColor}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{student.name}</h3>
                          <Badge variant={stressInfo.color as any}>
                            {stressInfo.level} STRESS
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                        <p className="text-xs text-muted-foreground">Last active: {student.lastActive}</p>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="text-sm">
                            <span className="font-medium">Stress Level:</span> {student.averageStress}/10
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Events:</span> {student.upcomingEvents}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>

                  {/* High Stress Events */}
                  {student.highStressEvents.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2 text-destructive">High Stress Events:</h4>
                      <div className="space-y-2">
                        {student.highStressEvents.map((event, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{event.title}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                Stress: {event.stressScore}/10
                              </Badge>
                              <span className="text-muted-foreground">
                                {event.date.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No students found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};