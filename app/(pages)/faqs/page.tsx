import Image from "next/image";
import { Accordion } from "@/app/components";
import { faqs } from "../../constants";
import faqImage from "@/app/assets/stock/FAQ.jpg";
import Link from "next/link";

const items = faqs.map((faq) => {
  return {
    label: faq.question,
    children: <p className="text-gray-700">{faq.answer}</p>,
  };
});

export default function FAQsPage() {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-60 md:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10"></div>
        <Image
          src={faqImage}
          alt="Frequently Asked Questions"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="z-20 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider drop-shadow-lg">
            Frequently Asked Questions
          </h2>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-[#00150f] mb-4">
            Common Questions
          </h3>
          <div className="w-24 h-1 bg-[#DAA520] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Find answers to frequently asked questions about our recruitment
            services.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-2 bg-[#DAA520]"></div>
          <div className="p-6">
            <Accordion items={items} />
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 bg-[#00150f]/5 rounded-lg p-6 text-center border-l-4 border-[#DAA520]">
          <h4 className="text-xl font-semibold text-[#00150f] mb-3">
            Still Have Questions?
          </h4>
          <p className="text-gray-700 mb-4">
            If you couldn&apos;t find the answer to your question, please
            don&apos;t hesitate to contact us directly.
          </p>
          <Link
            href="/contact-us"
            className="inline-block px-6 py-3 bg-[#00150f] text-white rounded-md hover:bg-[#00150f]/90 hover:text-[#DAA520] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
