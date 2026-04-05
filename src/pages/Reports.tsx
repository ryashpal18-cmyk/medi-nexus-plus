import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Image, Download } from "lucide-react";

const reports = [
  { patient: "Ramesh Kumar", type: "X-Ray", file: "xray_radius_left.jpg", date: "2026-04-05" },
  { patient: "Sunita Devi", type: "MRI", file: "mri_knee_right.pdf", date: "2026-04-04" },
  { patient: "Mohanlal Sharma", type: "Lab Report", file: "blood_report.pdf", date: "2026-04-03" },
  { patient: "Priya Jain", type: "X-Ray", file: "xray_shoulder.jpg", date: "2026-04-02" },
  { patient: "Geeta Bai", type: "Prescription", file: "prescription_rx.pdf", date: "2026-04-01" },
];

const typeIcon: Record<string, string> = {
  "X-Ray": "bg-primary/10 text-primary",
  "MRI": "bg-secondary/10 text-secondary",
  "Lab Report": "bg-success/10 text-success",
  "Prescription": "bg-warning/10 text-warning",
};

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="module-header">Reports & X-Ray</h1>
            <p className="text-sm text-muted-foreground">Upload and manage medical reports</p>
          </div>
          <Button className="gap-2"><Upload className="h-4 w-4" />Upload Report</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base">Recent Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${typeIcon[r.type] || "bg-muted"}`}>
                      {r.type === "X-Ray" ? <Image className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{r.patient}</p>
                      <p className="text-xs text-muted-foreground">{r.file}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">{r.type}</Badge>
                    <span className="text-xs text-muted-foreground hidden sm:inline">{r.date}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
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
