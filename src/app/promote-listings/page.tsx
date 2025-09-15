
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Target, TrendingUp, Zap } from 'lucide-react';

const promotionFeatures = [
    {
        icon: Rocket,
        title: "Homepage Feature",
        description: "Your item will be prominently displayed in a special 'Featured' section on our homepage, ensuring maximum exposure to everyone who visits."
    },
    {
        icon: TrendingUp,
        title: "Top of Search Results",
        description: "Promoted listings appear at the top of relevant search results, putting your item in front of buyers who are actively looking for it."
    },
    {
        icon: Zap,
        title: "Standout Badge",
        description: "A special 'Featured' badge will make your listing stand out from the rest, capturing more attention and clicks from potential buyers."
    },
    {
        icon: Target,
        title: "Reach More Buyers",
        description: "Combine all these benefits to significantly increase your listing's visibility and connect with a larger audience of interested buyers on campus."
    }
];

export default function PromoteListingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Rocket className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-4xl mt-4">Promote Your Listings</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Get your items seen by more buyers and sell faster. Choose a promotion plan to get started.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {promotionFeatures.map((feature, index) => (
            <Card key={index} className="bg-card hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                    <feature.icon className="h-8 w-8 text-primary flex-shrink-0" />
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="text-center">
        <h2 className="font-headline text-3xl mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6">Promoting your listing is easy. Click the button below to go to your dashboard and choose which items to feature.</p>
        <Button size="lg" asChild>
            <a href="/dashboard">Promote a Listing Now</a>
        </Button>
      </div>
    </div>
  );
}
