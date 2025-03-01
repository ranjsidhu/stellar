// import Image from "next/image";
// import contactImage from "@/app/assets/stock/contact.jpg"; // You'll need to add an appropriate image
import ContactUsForm from "./ContactUsForm";

export default function ContactUsPage() {
  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-60 md:h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00150f]/70 to-[#00150f]/80 z-10"></div>
        {/* <Image
          src={contactImage}
          alt="Contact Us"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        /> */}
        <div className="z-20 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wider drop-shadow-lg">
            Contact Us
          </h2>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="text-2xl font-bold text-[#00150f] mb-4">
            Get in Touch
          </h3>
          <div className="w-24 h-1 bg-[#DAA520] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 mb-8">
            We&apos;re here to help with your recruitment needs. Whether
            you&apos;re a school looking for talented educators or a teacher
            seeking new opportunities, we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Contact Methods */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-[#DAA520]"></div>
            <div className="p-8">
              <h4 className="text-xl font-bold text-[#00150f] mb-6">
                Contact Methods
              </h4>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#00150f]/10 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#00150f]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-[#00150f]">
                      Email
                    </h5>
                    <p className="text-gray-700 mb-2">
                      For enquiries, please contact:
                    </p>
                    <a
                      href="mailto:admin@stellar-recruitment.co.uk"
                      className="text-[#00150f] hover:text-[#DAA520] transition-colors"
                    >
                      admin@stellar-recruitment.co.uk
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#00150f]/10 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#00150f]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-[#00150f]">
                      Social Media
                    </h5>
                    <p className="text-gray-700 mb-3">
                      Connect with us on social media:
                    </p>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.instagram.com/stellar_recruitment_limited/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#00150f] text-white hover:bg-[#00150f]/90 p-2 rounded-full transition-colors"
                        aria-label="Instagram"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#00150f] text-white hover:bg-[#00150f]/90 p-2 rounded-full transition-colors"
                        aria-label="Facebook"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-3 bg-[#DAA520]"></div>
            <div className="p-8">
              <h4 className="text-xl font-bold text-[#00150f] mb-6">
                Send Us a Message
              </h4>
              <ContactUsForm />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-2xl font-bold text-[#00150f] mb-4 text-center">
            Frequently Asked Questions
          </h3>
          <div className="w-24 h-1 bg-[#DAA520] mx-auto mb-10"></div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-[#00150f] mb-2">
                What areas do you serve?
              </h4>
              <p className="text-gray-700">
                We operate primarily in the West Midlands, serving schools and
                educational professionals throughout the region.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-[#00150f] mb-2">
                How quickly can you respond to enquiries?
              </h4>
              <p className="text-gray-700">
                We aim to respond to all email enquiries within one working day.
                For urgent matters, please indicate this in your subject line.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-[#00150f] mb-2">
                Do you offer virtual meetings?
              </h4>
              <p className="text-gray-700">
                Yes, we can arrange virtual meetings via Zoom or Microsoft
                Teams. Please email us to schedule a convenient time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
