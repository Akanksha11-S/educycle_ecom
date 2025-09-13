import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, MapPin, Search, MessageSquare, Banknote } from 'lucide-react';

const riskManagementTips = [
    {
        icon: MapPin,
        title: "Meet in Public Places",
        description: "Always arrange to meet in a busy, public location on campus. Good examples include the main library, student union, or a popular café during the daytime. Avoid secluded areas."
    },
    {
        icon: Search,
        title: "Inspect Before You Pay",
        description: "Thoroughly inspect the item to ensure it matches the description and is in the condition you expect. For electronics, ask the seller to demonstrate that it's working."
    },
    {
        icon: MessageSquare,
        title: "Communicate Clearly",
        description: "Agree on the price and meeting details beforehand. Use on-campus communication methods if possible and avoid sharing unnecessary personal information."
    },
    {
        icon: Banknote,
        title: "Use Secure Payment Methods",
        description: "For in-person exchanges, cash is often simplest. If using a payment app, confirm the transaction is complete before parting ways. Avoid sharing bank details."
    },
    {
        icon: ShieldCheck,
        title: "Trust Your Instincts",
        description: "If a deal seems too good to be true or you feel uncomfortable for any reason, it's okay to walk away. Your safety is the top priority."
    }
];

export default function RiskManagementPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <ShieldCheck className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-4xl mt-4">Transaction Safety</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            EduCycle is a peer-to-peer platform. Here are some important tips to ensure your transactions are safe and successful.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {riskManagementTips.map((tip, index) => (
            <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <tip.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="font-headline text-xl">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
