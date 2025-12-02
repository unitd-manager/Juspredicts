import React from 'react';
import Navbar from "@/components/Navbar";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="flex p-4 flex-col lg:flex-row bg-gray-900 rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full">

          {/* Left Section: Get in touch information */}
          <div className="lg:w-1/2 p-8 bg-gradient-to-br from-gray-600 to-gray-800 flex flex-col justify-between rounded-l-lg">
            <h2 className="text-3xl font-bold mb-6">Get in touch</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Visit us</h3>
                <p>Come say hello at our office HQ.</p>
                <p>67 Wisteria Way Croydon South VIC 3136 AU</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Chat to us</h3>
                <p>Our friendly team is here to help.</p>
                <p>hello@paysphere.com</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Call us</h3>
                <p>Mon-Fri from 8am to 5pm</p>
                <p>(+995) 555-55-55-55</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Social media</h3>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a href="#" className="text-white hover:text-gray-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12
                    c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797
                    c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26
                    c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988
                    C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="#" className="text-white hover:text-gray-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0
                    2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11
                    19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764
                    1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75
                    1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4
                    0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7
                    2.476v6.759z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a href="#" className="text-white hover:text-gray-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.01 7.053.072C5.775.132 4.905.333
                    4.14.636C3.375.939 2.66 1.39 2.06 2.06C1.39 2.66.939 3.375.636
                    4.14C.333 4.905.131 5.775.072 7.053C.01 8.333 0 8.74 0
                    12s.01 3.667.072 4.947c.06 1.277.261 2.148.564 2.913c.303.765.754
                    1.479 1.42 2.144c.66.66 1.375 1.111 2.14 1.414c.765.302 1.636.503
                    2.913.564C8.333 23.94 8.74 24 12 24s3.667-.01
                    4.947-.072c1.277-.06 2.148-.262 2.913-.564c.765-.303 1.479-.754
                    2.144-1.42c.66-.66 1.112-1.375 1.414-2.14c.302-.765.503-1.636.564-2.913
                    C23.99 15.667 24 15.26 24 12s-.01-3.585-.072-4.85c-.06-1.277-.262-2.148-.564-2.913c-.303-.765-.754-1.479-1.42-2.144C21.34
                    2.66 20.625 2.209 19.86 1.907C19.095 1.605 18.224 1.404 16.947
                    1.344C15.667.06 15.26 0 12 0zm0 6.83c-3.432
                    0-6.22 2.788-6.22 6.22s2.788 6.22 6.22 6.22 6.22-2.788
                    6.22-6.22-2.788-6.22-6.22-6.22zm0 10.03c-2.105 0-3.81-1.705-3.81-3.81
                    s1.705-3.81 3.81-3.81 3.81 1.705 3.81 3.81-1.705 3.81-3.81
                    3.81z" />
                  </svg>
                </a>

                {/* Twitter */}
                <a href="#" className="text-white hover:text-gray-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.162 5.658c-.688.306-1.426.512-2.205.607.793-.475
                    1.39-1.224 1.671-2.124-.741.44-1.562.76-2.433.932-.7-.746-1.699-1.213-2.795-1.213-2.12
                    0-3.84 1.72-3.84 3.84 0 .3.034.59.1.867-3.19-.16-6.02-1.68-7.91-4.004-.33.57-.51
                    1.23-.51 1.93 0 1.33.678 2.504 1.708 3.19-.63-.02-1.22-.19-1.73-.47v.048c0
                    1.86 1.32 3.41 3.06 3.76-.32.09-.66.14-1.01.14-.24 0-.47-.02-.7-.07.48 1.51 1.89
                    2.62 3.56 2.65-1.31 1.03-2.96 1.65-4.75 1.65-.31 0-.62-.02-.92-.05 1.7
                    1.09 3.72 1.72 5.89 1.72 7.06 0 10.92-5.85 10.92-10.92 0-.16 0-.33-.01-.49.75-.54
                    1.4-1.22 1.92-1.99z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="lg:w-1/2 p-8 bg-gray-900">
            <form className="space-y-4">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
                    placeholder="Randomfirst"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
                    placeholder="Randomlast"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-300">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
                  placeholder="RandomCompany"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
                  placeholder="Random@gmail.com"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">Phone Number</label>
                <div className="flex mt-1">
                  <select
                    id="countryCode"
                    className="p-2 border border-gray-700 rounded-l-md bg-gray-800 text-white"
                  >
                    <option>+995</option>
                  </select>
                  <input
                    type="text"
                    id="phoneNumber"
                    className="block w-full p-2 border border-gray-700 rounded-r-md bg-gray-800 text-white"
                    placeholder="555-55-55-55"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
                  placeholder="Tell us what we can help you with"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  className="h-4 w-4 text-gray-600 border-gray-700 rounded"
                />
                <label htmlFor="privacyPolicy" className="ml-2 text-sm text-gray-300">
                  I'd like to receive more information about company. I agree to the{" "}
                  <a href="#" className="text-gray-400 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-2 px-4 rounded-md shadow-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
