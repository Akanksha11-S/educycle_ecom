import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Logo from './Logo';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary text-secondary-foreground mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                          <Logo />
                          <span className="font-headline text-2xl font-bold">EduCycle</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Built by Engineers, for Engineers. Right Here on Campus.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-headline text-lg font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2">
                            <li><Button variant="link" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><Link href="/">Browse</Link></Button></li>
                            <li><Button variant="link" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><Link href="/wtb">WTB Board</Link></Button></li>
                            <li><Button variant="link" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><Link href="/login">Login</Link></Button></li>
                            <li><Button variant="link" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><Link href="/register">Register</Link></Button></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-headline text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><Button variant="link" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><Link href="/faq">FAQ</Link></Button></li>
                            <li><Button variant="link" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><Link href="/safety-measures">Safety Measures</Link></Button></li>
                            <li><Button variant="link" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-primary"><Link href="#">Contact Us</Link></Button></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-headline text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                    <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                </a>
                            </Button>
                        </div>
                    </div>

                </div>

                <Separator className="my-8 bg-border" />

                 <div className="text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} EduCycle. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
