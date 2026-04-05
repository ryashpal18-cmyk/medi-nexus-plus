import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import {
  Users, Calendar, Receipt, FileText, Activity, AlertTriangle,
  Stethoscope, BedDouble, TrendingUp, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentAppointments = [
  { name: "Ramesh Kumar", time: "10:00 AM", type: "Fracture Follow-up", status: "Scheduled" },
  { name: "Sunita Devi", time: "10:30 AM", type: "Physiotherapy", status: "In Progress" },
  { name: "Mohanlal Sharma", time: "11:00 AM", type: "X-Ray Review", status: "Scheduled" },
  { name: "Priya Jain", time: "11:30 AM", type: "New OPD", status: "Waiting" },
];

const recentPrescriptions = [
  { patient: "Ramesh Kumar", diagnosis: "Radius Fracture", date: "Today" },
  { patient: "Geeta Bai", diagnosis: "Knee Osteoarthritis", date: "Today" },
  { patient: "Suresh Patel", diagnosis: "Shoulder Dislocation", date: "Yesterday" },
];

const statusColors: Record<string, string> = {
  "Scheduled": "bg-info/10 text-info",
  "In Progress": "bg-warning/10 text-warning",
  "Waiting": "bg-muted text-muted-foreground",
  "Completed": "bg-success/10 text-success",
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="module-header">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Welcome back, Dr. Rathore · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <Button className="emergency-btn gap-2 w-fit">
            <AlertTriangle className="h-4 w-4" />
            Emergency Admission
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Today's Patients" value={24} icon={Users} variant="primary" trend="+12% from yesterday" />
          <StatCard title="Appointments" value={18} icon={Calendar} variant="secondary" />
          <StatCard title="Pending Payments" value="₹12,450" icon={Receipt} variant="warning" />
          <StatCard title="Beds Occupied" value="8/15" icon={BedDouble} variant="success" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Today's Appointments
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-primary text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAppointments.map((apt, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Stethoscope className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{apt.name}</p>
                      <p className="text-xs text-muted-foreground">{apt.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{apt.time}</p>
                    <Badge variant="secondary" className={statusColors[apt.status] + " text-[10px] border-0"}>
                      {apt.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Prescriptions */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-heading flex items-center gap-2">
                  <FileText className="h-4 w-4 text-secondary" />
                  Recent Prescriptions
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-primary text-xs">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPrescriptions.map((rx, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{rx.patient}</p>
                    <p className="text-xs text-muted-foreground">{rx.diagnosis}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{rx.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-heading">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "New Patient", icon: Users, variant: "primary" as const },
                  { label: "New Appointment", icon: Calendar, variant: "secondary" as const },
                  { label: "Create Bill", icon: Receipt, variant: "warning" as const },
                  { label: "Upload X-Ray", icon: FileText, variant: "success" as const },
                  { label: "Physiotherapy", icon: Activity, variant: "info" as const },
                  { label: "View Reports", icon: TrendingUp, variant: "default" as const },
                ].map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-auto py-3 flex flex-col items-center gap-2 hover:bg-accent"
                  >
                    <action.icon className="h-5 w-5 text-primary" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Physiotherapy Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-heading flex items-center gap-2">
                <Activity className="h-4 w-4 text-secondary" />
                Physiotherapy Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Ramesh Kumar", sessions: "6/10", pain: 4, exercise: "Shoulder ROM" },
                { name: "Geeta Bai", sessions: "3/8", pain: 6, exercise: "Knee Strengthening" },
                { name: "Suresh Patel", sessions: "8/12", pain: 2, exercise: "Wrist Mobility" },
              ].map((pt, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{pt.name}</p>
                    <p className="text-xs text-muted-foreground">{pt.exercise}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">Sessions: {pt.sessions}</p>
                    <p className="text-xs text-muted-foreground">Pain: {pt.pain}/10</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
