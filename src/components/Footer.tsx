import { MapPin, BookOpen, Coffee } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Footer = () => {
    return (
        <footer className="bg-card border-t mt-12 py-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-primary" />
                                Good Luck Stationary Shop
                            </CardTitle>
                            <CardDescription>Your one-stop shop for all engineering supplies.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">123 College Road, University Campus, Pune</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline">
                                <Link href="https://www.google.com/maps/search/?api=1&query=Good+Luck+Stationary+Shop" target="_blank" rel="noopener noreferrer">
                                    <MapPin className="mr-2 h-4 w-4" /> Find Us
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl flex items-center gap-2">
                                <Coffee className="h-5 w-5 text-primary" />
                                Relish Café
                            </CardTitle>
                            <CardDescription>Fuel your study sessions with the best coffee on campus.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">456 Library Lane, University Campus, Pune</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline">
                                <Link href="https://www.google.com/maps/search/?api=1&query=Relish+Cafe" target="_blank" rel="noopener noreferrer">
                                    <MapPin className="mr-2 h-4 w-4" /> Find Us
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                 <div className="text-center text-sm text-muted-foreground mt-8">
                    <p>&copy; {new Date().getFullYear()} EduCycle. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
