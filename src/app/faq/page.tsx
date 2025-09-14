import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, ShoppingCart, Tag, MessageSquare, IndianRupee } from 'lucide-react';

const faqData = {
    buying: [
        {
            q: "How do I buy an item?",
            a: "You can either add items to your cart or use the 'Buy Now' button for a direct purchase. The 'Buy Now' option will take you to an order summary. All transactions are peer-to-peer, so you'll still need to contact the seller to arrange pickup and payment."
        },
        {
            q: "How do I contact a seller?",
            a: "The seller's email is listed on the product page. You should coordinate with the seller via email or other campus-approved channels to arrange a meeting and finalize the transaction."
        },
        {
            q: "Are there any fees for buying?",
            a: "Yes, there is a small 5% platform fee added at checkout to help maintain the service. This will be clearly shown in your order summary before you confirm the purchase."
        },
        {
            q: "What is the 'Want to Buy' (WTB) board?",
            a: "The WTB board is a place where you can post a request for an item you're looking for. Sellers who have that item can then see your post and contact you directly."
        }
    ],
    selling: [
        {
            q: "How do I list an item for sale?",
            a: "You must be registered as a 'Seller'. Once logged in, use the 'Add Product' option from your user menu. Fill in the details, upload at least one image, and your item will be listed on the marketplace."
        },
        {
            q: "What can I sell on EduCycle?",
            a: "You can sell second-hand educational materials like textbooks, electronics, drafting equipment, and other college-related supplies."
        },
        {
            q: "How do I get paid?",
            a: "You arrange payment directly with the buyer. Agree on a method that is safe and convenient for both of you. The platform fee is handled at the time of purchase confirmation, but the item payment is between you and the buyer."
        }
    ],
    safety: [
        {
            q: "How do I stay safe during transactions?",
            a: "Always meet in a public, well-lit place on campus. Check a user's verification status on their profile. Look for the green checkmark, which indicates they have been verified by an admin. See our 'Safety Measures' page for more tips."
        },
        {
            q: "What if an item is not as described?",
            a: "As all transactions are peer-to-peer, disputes must be resolved between the buyer and seller. We strongly encourage buyers to inspect items carefully before purchase, as all sales are considered final through the platform."
        }
    ]
}

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
