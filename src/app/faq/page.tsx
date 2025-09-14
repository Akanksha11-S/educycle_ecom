import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, ShoppingCart, Tag, MessageSquare, IndianRupee } from 'lucide-react';

const faqData = {
    buying: [
        {
            q: "How do I buy an item?",
            a: "You can either add items to your cart or use the 'Buy Now' button for a direct purchase. Both options will take you to a secure checkout process where the transaction is completed within the app. After purchase, you can coordinate with the seller for pickup."
        },
        {
            q: "How do I contact a seller?",
            a: "The seller's email is listed on the product page. You can use this to arrange a meeting for pickup after you have completed your purchase through the app."
        },
        {
            q: "Are there any fees for buying?",
            a: "Yes, there is a small 5% platform fee added at checkout to help maintain the service and ensure secure transactions. This will be clearly shown in your order summary before you confirm the purchase."
        },
        {
            q: "What is the 'Want to Buy' (WTB) board?",
            a: "The WTB board is a place where you can post a request for an item you're looking for. Sellers who have that item can then see your post and contact you directly to arrange a sale through the platform."
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
            a: "Payment is processed securely through the app when a buyer purchases your item. The funds are then transferred to your account. This eliminates the need to handle cash or arrange direct payments with the buyer."
        }
    ],
    safety: [
        {
            q: "How do I stay safe during transactions?",
            a: "Always meet in a public, well-lit place on campus for item pickup. Check a user's verification status on their profile—look for the green checkmark. Since payments are handled in-app, you don't need to worry about carrying cash."
        },
        {
            q: "What if an item is not as described?",
            a: "We encourage buyers to inspect items carefully at pickup before confirming the exchange. If there is a significant issue, please contact our support team through the app. As sales are between peers, resolving disputes directly is often quickest, but we are here to help."
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
