import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const sessions = [
  { patient: "Ramesh Kumar", exercise: "Shoulder ROM Exercises", session: 6, total: 10, pain: 4, notes: "Improving steadily, full abduction achieved" },
  { patient: "Geeta Bai", exercise: "Knee Strengthening", session: 3, total: 8, pain: 6, notes: "Moderate pain during quad sets" },
  { patient: "Suresh Patel", exercise: "Wrist Mobility + Grip", session: 8, total: 12, pain: 2, notes: "Near full recovery, grip strength 80%" },
  { patient: "Mohanlal Sharma", exercise: "Lower Back Rehab", session: 2, total: 10, pain: 7, notes: "Initial sessions, requires careful progression" },
];

export default function Physiotherapy() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="module-header">Physiotherapy</h1>
            <p className="text-sm text-muted-foreground">Track exercise plans and patient progress</p>
          </div>
          <Button className="gap-2"><Plus className="h-4 w-4" />New Session</Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {sessions.map((s, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-heading">{s.patient}</CardTitle>
                  <Badge variant="outline" className="text-xs">Session {s.session}/{s.total}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-secondary" />
                  <span className="text-sm">{s.exercise}</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{Math.round((s.session / s.total) * 100)}%</span>
                  </div>
                  <Progress value={(s.session / s.total) * 100} className="h-2" />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Pain Scale</span>
                  <span className="font-medium">{s.pain}/10</span>
                </div>
                <p className="text-xs text-muted-foreground border-t pt-2">{s.notes}</p>
                <div className="text-xs text-muted-foreground">
                  Remaining: {s.total - s.session} sessions
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
