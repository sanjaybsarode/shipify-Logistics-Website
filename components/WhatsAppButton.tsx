
import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message }) => {
  const defaultMessage = "Hello Shipify Logistics, I have a question about your services.";
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:bg-[#128C7E] transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
