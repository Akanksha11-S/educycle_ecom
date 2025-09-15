
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone } from 'lucide-react';

const AdvertisementBanner = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div className="flex items-center gap-4">
                        <Megaphone className="h-10 w-10 flex-shrink-0" />
                        <div>
                            <h3 className="font-headline text-2xl">Promote Your Listings!</h3>
                            <p className="opacity-90 max-w-lg">Want to sell your items faster? Get them featured on our homepage and reach more buyers today.</p>
                        </div>
                    </div>
                    <Button variant="secondary" size="lg" className="flex-shrink-0">
                        Learn More
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdvertisementBanner;
