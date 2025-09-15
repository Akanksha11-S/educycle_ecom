
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, PenSquare, MapPin } from 'lucide-react';
import Link from "next/link";

const advertisements = [
    {
        icon: PenSquare,
        title: "Goodluck Stationary",
        description: "Your one-stop shop for all your stationery needs, from pens and notebooks to art supplies.",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=stationary+store"
    },
    {
        icon: Utensils,
        title: "Relish Cafe",
        description: "Take a break and enjoy a delicious cup of coffee or a tasty snack. The perfect spot to recharge.",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=cafe"
    }
];

const AdvertisementBanner = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {advertisements.map((ad, index) => (
                    <Card key={index} className="bg-secondary border-none shadow-lg">
                        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                            <div className="flex items-center gap-4">
                                <ad.icon className="h-10 w-10 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-headline text-2xl text-primary">{ad.title}</h3>
                                    <p className="text-muted-foreground max-w-lg">{ad.description}</p>
                                </div>
                            </div>
                            <Button variant="default" size="lg" className="flex-shrink-0" asChild>
                                <Link href={ad.mapUrl} target="_blank">
                                    <MapPin className="mr-2 h-4 w-4" />
                                    Find on Maps
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdvertisementBanner;
