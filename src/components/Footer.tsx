import { MapPin, BookOpen, Coffee, HelpCircle, Shield } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
    return (
        <footer className="bg-card border-t mt-12 py-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-3">
                            <BookOpen className="h-6 w-6 text-primary" />
                            <CardTitle className="font-headline text-xl">Good Luck Stationary</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <CardDescription>Your one-stop shop for all engineering supplies.</CardDescription>
                            <p className="text-sm mt-2">123 College Road, University Campus, Pune</p>
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
                        <CardHeader className="flex flex-row items-center gap-3">
                            <Coffee className="h-6 w-6 text-primary" />
                            <CardTitle className="font-headline text-xl">Relish Café</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <CardDescription>Fuel your study sessions with the best coffee on campus.</CardDescription>
                            <p className="text-sm mt-2">456 Library Lane, University Campus, Pune</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline">
                                <Link href="https://www.google.com/maps/search/?api=1&query=Relish+Cafe" target="_blank" rel="noopener noreferrer">
                                    <MapPin className="mr-2 h-4 w-4" /> Find Us
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <div className="space-y-4">
                        <h3 className="font-headline text-xl">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Button variant="link" asChild className="p-0 h-auto font-normal">
                                    <Link href="/faq" className='flex items-center gap-2'><HelpCircle className="h-4 w-4"/> FAQ</Link>
                                </Button>
                            </li>
                             <li>
                                <Button variant="link" asChild className="p-0 h-auto font-normal">
                                    <Link href="/safety-measures" className='flex items-center gap-2'><Shield className="h-4 w-4"/> Safety Measures</Link>
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator className="my-8" />
                 <div className="text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} EduCycle. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
