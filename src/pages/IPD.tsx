import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Bed {
  number: string;
  type: "Ward" | "Semi-Private" | "Private";
  status: "available" | "occupied" | "reserved";
  patient?: string;
}

const beds: Bed[] = [
  { number: "W-01", type: "Ward", status: "available" },
  { number: "W-02", type: "Ward", status: "occupied", patient: "Ramesh Kumar" },
  { number: "W-03", type: "Ward", status: "occupied", patient: "Sunita Devi" },
  { number: "W-04", type: "Ward", status: "available" },
  { number: "W-05", type: "Ward", status: "reserved" },
  { number: "SP-01", type: "Semi-Private", status: "occupied", patient: "Mohanlal" },
  { number: "SP-02", type: "Semi-Private", status: "available" },
  { number: "SP-03", type: "Semi-Private", status: "occupied", patient: "Priya Jain" },
  { number: "SP-04", type: "Semi-Private", status: "available" },
  { number: "P-01", type: "Private", status: "occupied", patient: "Suresh Patel" },
  { number: "P-02", type: "Private", status: "available" },
  { number: "P-03", type: "Private", status: "occupied", patient: "Geeta Bai" },
  { number: "P-04", type: "Private", status: "reserved" },
  { number: "P-05", type: "Private", status: "available" },
  { number: "P-06", type: "Private", status: "available" },
];

const statusColor = {
  available: "bg-success/20 border-success/40 text-success",
  occupied: "bg-destructive/20 border-destructive/40 text-destructive",
  reserved: "bg-warning/20 border-warning/40 text-warning",
};

const statusBg = {
  available: "bg-success",
  occupied: "bg-destructive",
  reserved: "bg-warning",
};

export default function IPD() {
  const grouped = {
    Ward: beds.filter(b => b.type === "Ward"),
    "Semi-Private": beds.filter(b => b.type === "Semi-Private"),
    Private: beds.filter(b => b.type === "Private"),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="module-header">IPD / Bed Management</h1>
            <p className="text-sm text-muted-foreground">Manage admissions and bed allocation</p>
          </div>
          <Button className="gap-2"><Plus className="h-4 w-4" />New Admission</Button>
        </div>

        {/* Legend */}
        <div className="flex gap-4 flex-wrap">
          {(["available", "occupied", "reserved"] as const).map(s => (
            <div key={s} className="flex items-center gap-2 text-sm">
              <div className={cn("h-3 w-3 rounded-full", statusBg[s])} />
              <span className="capitalize">{s}</span>
            </div>
          ))}
        </div>

        {Object.entries(grouped).map(([type, typeBeds]) => (
          <Card key={type}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-heading">{type} ({typeBeds.length} beds)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {typeBeds.map(bed => (
                  <div
                    key={bed.number}
                    className={cn(
                      "border rounded-lg p-3 text-center cursor-pointer transition-all hover:shadow-md",
                      statusColor[bed.status]
                    )}
                  >
                    <BedDouble className="h-6 w-6 mx-auto mb-1" />
                    <p className="font-bold text-sm">{bed.number}</p>
                    {bed.patient && <p className="text-[10px] mt-1 truncate">{bed.patient}</p>}
                    <Badge variant="secondary" className={cn("text-[9px] mt-1 border-0", statusColor[bed.status])}>
                      {bed.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
