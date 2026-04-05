import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const appointments = [
  { id: 1, patient: "Ramesh Kumar", time: "10:00 AM", type: "Follow-up", status: "Scheduled", date: "2026-04-05" },
  { id: 2, patient: "Sunita Devi", time: "10:30 AM", type: "Physiotherapy", status: "Completed", date: "2026-04-05" },
  { id: 3, patient: "Mohanlal Sharma", time: "11:00 AM", type: "X-Ray Review", status: "Scheduled", date: "2026-04-05" },
  { id: 4, patient: "Priya Jain", time: "11:30 AM", type: "New OPD", status: "Scheduled", date: "2026-04-05" },
  { id: 5, patient: "Suresh Patel", time: "02:00 PM", type: "Fracture Check", status: "Cancelled", date: "2026-04-05" },
  { id: 6, patient: "Geeta Bai", time: "02:30 PM", type: "Knee Review", status: "Scheduled", date: "2026-04-06" },
];

const statusStyle: Record<string, string> = {
  Scheduled: "bg-info/10 text-info border-info/20",
  Completed: "bg-success/10 text-success border-success/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Appointments() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="module-header">Appointments</h1>
            <p className="text-sm text-muted-foreground">Schedule and manage patient appointments</p>
          </div>
          <Button className="gap-2"><Plus className="h-4 w-4" />New Appointment</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{apt.patient}</p>
                      <p className="text-xs text-muted-foreground">{apt.type} · {apt.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{apt.time}</span>
                    <Badge className={cn("text-xs border", statusStyle[apt.status])}>{apt.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
