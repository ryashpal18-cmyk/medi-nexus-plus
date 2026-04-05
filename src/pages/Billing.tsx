import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Receipt, Plus, MessageCircle, Printer } from "lucide-react";
import { cn } from "@/lib/utils";

const bills = [
  { id: "INV-001", patient: "Ramesh Kumar", service: "OPD Consultation", amount: 500, status: "Paid", date: "2026-04-05" },
  { id: "INV-002", patient: "Sunita Devi", service: "X-Ray + OPD", amount: 1200, status: "Pending", date: "2026-04-05" },
  { id: "INV-003", patient: "Mohanlal Sharma", service: "Physiotherapy (5 sessions)", amount: 3000, status: "Partial", date: "2026-04-04" },
  { id: "INV-004", patient: "Priya Jain", service: "IPD Stay (3 days)", amount: 8500, status: "Pending", date: "2026-04-03" },
  { id: "INV-005", patient: "Suresh Patel", service: "Plaster + X-Ray", amount: 1800, status: "Paid", date: "2026-04-02" },
];

const statusStyle: Record<string, string> = {
  Paid: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Partial: "bg-info/10 text-info",
};

function getWhatsAppLink(patient: string, amount: number) {
  const msg = `Namaste ${patient}, Balaji Ortho Care Center se nivedan hai ki aapka Rs. ${amount} pending hai. Kripya clinic par jama karein. Dhanyawad!`;
  return `https://wa.me/918005707783?text=${encodeURIComponent(msg)}`;
}

export default function Billing() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="module-header">Billing</h1>
            <p className="text-sm text-muted-foreground">Manage invoices, receipts, and payments</p>
          </div>
          <Button className="gap-2"><Plus className="h-4 w-4" />New Bill</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Receipt className="h-4 w-4 text-primary" />
              Recent Bills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground text-xs">
                    <th className="text-left py-2 font-medium">Invoice</th>
                    <th className="text-left py-2 font-medium">Patient</th>
                    <th className="text-left py-2 font-medium hidden sm:table-cell">Service</th>
                    <th className="text-right py-2 font-medium">Amount</th>
                    <th className="text-center py-2 font-medium">Status</th>
                    <th className="text-right py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map(bill => (
                    <tr key={bill.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="py-3 font-medium">{bill.id}</td>
                      <td className="py-3">{bill.patient}</td>
                      <td className="py-3 hidden sm:table-cell text-muted-foreground">{bill.service}</td>
                      <td className="py-3 text-right font-medium">₹{bill.amount.toLocaleString()}</td>
                      <td className="py-3 text-center">
                        <Badge className={cn("text-[10px] border-0", statusStyle[bill.status])}>{bill.status}</Badge>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Printer className="h-3 w-3" />
                          </Button>
                          {bill.status !== "Paid" && (
                            <a href={getWhatsAppLink(bill.patient, bill.amount)} target="_blank" rel="noopener">
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-success">
                                <MessageCircle className="h-3 w-3" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
