import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Search, FileText, Clock, Printer, Download, MessageCircle } from "lucide-react";
import { useState } from "react";

const orthoAdvice: Record<string, string> = {
  "Plaster Care": "प्लास्टर केयर सलाह:\n• प्लास्टर को सूखा रखें\n• उंगलियों को हिलाते रहें\n• सूजन या सुन्नपन होने पर तुरंत डॉक्टर से मिलें\n• प्लास्टर को खुद न निकालें",
  "Fracture Healing": "फ्रैक्चर हीलिंग सलाह:\n• कैल्शियम युक्त भोजन लें (दूध, दही, पनीर)\n• प्रोटीन से भरपूर खाना खाएं\n• विटामिन D के लिए धूप में बैठें\n• डॉक्टर की सलाह के बिना वजन न डालें",
  "Upper Limb": "ऊपरी अंग सलाह:\n• हाथ को ऊंचा रखें (तकिये पर)\n• उंगलियों की एक्सरसाइज करें\n• भारी वस्तु न उठाएं\n• स्लिंग नियमित पहनें",
  "Lower Limb": "निचले अंग सलाह:\n• पैर को ऊंचा रखें\n• बिना सहारे के न चलें\n• बर्फ की सिकाई करें\n• वजन डालने से पहले डॉक्टर से पूछें",
  "Physiotherapy": "फिजियोथेरेपी सलाह:\n• रोजाना बताई गई एक्सरसाइज करें\n• दर्द होने पर रुकें, जबरदस्ती न करें\n• गर्म/ठंडी सिकाई नियम से करें\n• फॉलो-अप में आएं",
  "Emergency Warning": "आपातकालीन चेतावनी:\n⚠️ तुरंत डॉक्टर से मिलें यदि:\n• उंगलियां नीली/सुन्न हो जाएं\n• असहनीय दर्द हो\n• प्लास्टर टूट जाए\n• बुखार आए\n• सूजन बहुत बढ़ जाए",
};

export default function OPD() {
  const [advice, setAdvice] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="module-header">OPD Module</h1>
            <p className="text-sm text-muted-foreground">Out Patient Department Management</p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            New Patient
          </Button>
        </div>

        <Tabs defaultValue="register" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="prescription">Prescription</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">New Patient Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Patient Name</Label>
                    <Input placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile Number</Label>
                    <Input placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input type="number" placeholder="Age" />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label>Address</Label>
                    <Textarea placeholder="Full address" />
                  </div>
                  <div className="sm:col-span-2">
                    <Button className="w-full sm:w-auto">Register Patient</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">Search Patient</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Search by mobile number or name" className="flex-1" />
                  <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </div>
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Enter a mobile number or name to search patient records
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescription">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Digital Prescription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Patient Name</Label>
                      <Input placeholder="Select patient" />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Diagnosis</Label>
                    <Input placeholder="e.g., Radius Fracture, Knee OA" />
                  </div>
                  <div className="space-y-2">
                    <Label>Medicines</Label>
                    <Textarea placeholder="Medicine 1 - Dose - Duration&#10;Medicine 2 - Dose - Duration" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>Advice</Label>
                    <Textarea placeholder="Special instructions..." rows={3} value={advice} onChange={e => setAdvice(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Follow-up Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button className="gap-2"><Printer className="h-4 w-4" />Print</Button>
                    <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />PDF</Button>
                    <Button variant="outline" className="gap-2 text-success"><MessageCircle className="h-4 w-4" />WhatsApp</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-sm">Smart Advice Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.keys(orthoAdvice).map((key) => (
                    <Button
                      key={key}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => setAdvice(prev => prev ? prev + "\n\n" + orthoAdvice[key] : orthoAdvice[key])}
                    >
                      {key}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
