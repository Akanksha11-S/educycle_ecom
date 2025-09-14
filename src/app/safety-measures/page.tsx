import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, MapPin, Search, MessageSquare, Banknote, UserCheck } from 'lucide-react';

const safetyMeasures = [
    {
        icon: Banknote,
        title: "Secure In-App Payments",
        description: "All payments are processed securely through the app. Never exchange cash or use external payment methods. This protects both buyers and sellers from payment-related fraud."
    },
    {
        icon: MapPin,
        title: "Meet in Public for Pickup",
        description: "For the physical exchange of items, always arrange to meet in a busy, public location on campus. Good examples include the main library, student union, or a popular café during the daytime."
    },
    {
        icon: UserCheck,
        title: "Check for Verification",
        description: "Look for the green checkmark next to a user's name. This indicates they have been verified by an admin, adding a layer of trust. Prioritize dealing with verified users."
    },
    {
        icon: Search,
        title: "Inspect Before You Confirm",
        description: "Thoroughly inspect the item during pickup to ensure it matches the description. For electronics, ask the seller to demonstrate that it's working before you finalize the exchange in the app."
    },
    {
        icon: MessageSquare,
        title: "Communicate Within the App",
        description: "Use the app's messaging system to communicate with the other party. This keeps a record of your conversation and helps protect your personal contact information."
    },
    {
        icon: ShieldCheck,
        title: "Trust Your Instincts",
        description: "If an offer seems too good to be true or you feel uncomfortable for any reason during the pickup arrangement, it's okay to cancel the transaction. Your safety is the top priority."
    }
];

export default function SafetyMeasuresPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <ShieldCheck className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-4xl mt-4">Transaction Safety Measures</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Your security is our priority. Follow these tips to ensure your transactions on EduCycle are safe and successful.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {safetyMeasures.map((tip, index) => (
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
