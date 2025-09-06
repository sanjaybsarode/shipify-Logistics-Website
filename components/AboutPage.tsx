import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              About Shipify Logistics
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We are a technology-driven logistics company dedicated to simplifying the complexities of global trade and supply chain management.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            {/* Our Mission */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-4 text-gray-600">
                Our mission is to empower businesses of all sizes to navigate the global marketplace with confidence. We achieve this by providing intelligent, reliable, and transparent logistics solutions that are both powerful and easy to use. We believe that by simplifying logistics, we can help our clients focus on what they do best: growing their business.
              </p>
            </div>

            {/* Our Story */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
              <p className="mt-4 text-gray-600">
                Founded by a team of logistics experts and software engineers, Shipify Logistics was born from a shared frustration with the opaque and outdated systems that dominate the shipping industry. We saw an opportunity to build something better—a platform that leverages modern technology to provide real-time visibility, actionable data, and unparalleled efficiency. From our humble beginnings, we've grown into a trusted partner for companies worldwide, handling complex supply chains with a commitment to innovation and customer success.
              </p>
            </div>

            {/* Our Core Values */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Core Values</h2>
              <ul className="mt-4 space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span><strong>Innovation:</strong> We are constantly exploring new technologies and methodologies to stay ahead of the curve and deliver cutting-edge solutions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span><strong>Reliability:</strong> We understand that our clients' businesses depend on us. We are committed to providing dependable, on-time services with unwavering integrity.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span><strong>Customer-Centricity:</strong> Our clients are at the heart of everything we do. We work as a true partner to understand their unique needs and deliver tailored solutions.</span>
                </li>
                 <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  <span><strong>Transparency:</strong> We believe in open and honest communication, providing clear pricing and real-time visibility throughout the entire shipping process.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
