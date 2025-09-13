import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, ShoppingCart, Tag, MessageSquare, IndianRupee } from 'lucide-react';

const faqData = {
    buying: [
        {
            q: "How do I buy an item?",
            a: "Simply browse the products, and when you find something you want, click the 'Add to Cart' button. You can then proceed to your cart to review your items. Contacting the seller is done outside the platform to arrange pickup and payment."
        },
        {
            q: "How do I contact a seller?",
            a: "Currently, all transactions are finalized in person. After expressing interest, you should coordinate with the seller via campus-approved channels or in person to arrange a meeting."
        },
        {
            q: "What payment methods are accepted?",
            a: "Payments are handled directly between the buyer and seller. We recommend using cash or a secure peer-to-peer payment app. EduCycle does not process payments."
        }
    ],
    selling: [
        {
            q: "How do I list an item for sale?",
            a: "You must be registered as a 'Seller'. Once logged in, use the 'Add Product' option from your user menu. Fill in the details, and your item will be listed on the marketplace."
        },
        {
            q: "What can I sell on EduCycle?",
            a: "You can sell second-hand educational materials like textbooks, electronics, drafting equipment, and other college-related supplies."
        },
        {
            q: "How do I get paid?",
            a: "You arrange payment directly with the buyer. Agree on a method that is safe and convenient for both of you before you hand over the item."
        }
    ],
    safety: [
        {
            q: "How do I stay safe during transactions?",
            a: "Always meet in a public, well-lit place on campus, like the library lobby or a café. Never share personal financial information beyond what's necessary for the transaction. Inspect the item thoroughly before paying."
        },
        {
            q: "What if an item is not as described?",
            a: "As all transactions are peer-to-peer, disputes must be resolved between the buyer and seller. We strongly encourage buyers to inspect items carefully before purchase, as all sales are final."
        }
    ]
}

const IconWrapper = ({ icon: Icon }: { icon: React.ElementType }) => (
    <Icon className="h-5 w-5 text-primary mr-3" />
);

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl text-center mb-10">Frequently Asked Questions</h1>

        <div className="space-y-8">
            <div>
                <h2 className="font-headline text-2xl mb-4 flex items-center"><ShoppingCart className="h-6 w-6 mr-3 text-primary"/>For Buyers</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqData.buying.map((item, index) => (
                        <AccordionItem value={`buying-${index}`} key={index}>
                            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                            <AccordionContent>{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div>
                <h2 className="font-headline text-2xl mb-4 flex items-center"><Tag className="h-6 w-6 mr-3 text-primary"/>For Sellers</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqData.selling.map((item, index) => (
                        <AccordionItem value={`selling-${index}`} key={index}>
                            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                            <AccordionContent>{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div>
                <h2 className="font-headline text-2xl mb-4 flex items-center"><ShieldCheck className="h-6 w-6 mr-3 text-primary"/>Safety & Trust</h2>
                <Accordion type="single" collapsible className="w-full">
                     {faqData.safety.map((item, index) => (
                        <AccordionItem value={`safety-${index}`} key={index}>
                            <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                            <AccordionContent>{item.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    </div>
  );
}
