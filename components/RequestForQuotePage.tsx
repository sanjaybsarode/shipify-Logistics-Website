


import React, { useState } from 'react';
import { Quote } from '../types';

interface RequestForQuotePageProps {
  onBack: () => void;
  quote: Quote | null;
}

const RequestForQuotePage: React.FC<RequestForQuotePageProps> = ({ onBack, quote }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [commodity, setCommodity] = useState('');
    const [notes, setNotes] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
            name, company, email, commodity, notes, quote
        });
        setSubmitted(true);
    };

    if (!quote) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h2 className="text-2xl font-bold text-red-600">Error</h2>
                <p className="mt-2 text-gray-600">No quote details were found. Please generate a quote first.</p>
                <button onClick={onBack} className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Back to Quote Calculator
                </button>
            </div>
        );
    }
    
    if (submitted) {
        return (
             <div className="container mx-auto p-8 text-center">
                <h2 className="text-3xl font-bold text-green-600">Thank You!</h2>
                <p className="mt-2 text-gray-700 max-w-xl mx-auto">Your quote request has been submitted successfully. Our team will review the details and get back to you at <strong>{email}</strong> shortly.</p>
                <button onClick={onBack} className="mt-6 bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                    Back to Quote Calculator
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12 md:py-16">
                 <div className="max-w-4xl mx-auto">
                    <button onClick={onBack} className="mb-6 text-sm text-green-600 hover:text-green-800 font-semibold">
                        &larr; Back to Instant Quote
                    </button>
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Request an Official Quote
                        </h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                           Please provide your details below. Our team will prepare a formal quote based on your request.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Quote Summary */}
                        <div className="bg-slate-800 text-white p-6 md:p-8 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold mb-4 border-b border-slate-600 pb-2">Your Shipment Estimate</h3>
                             <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-slate-300">Route:</p>
                                    <p className="text-md font-semibold">{quote.originName} to {quote.destinationName}</p>
                                </div>

                                {quote.cargoType === 'Container' && (
                                    <div>
                                        <p className="text-sm text-slate-300">Container:</p>
                                        <p className="text-md font-semibold">{quote.containerLabel}</p>
                                    </div>
                                )}
                                
                                {(quote.cargoType === 'GeneralCargo' || quote.cargoType === 'ODC') && (
                                    <div>
                                        <p className="text-sm text-slate-300">Cargo Details:</p>
                                        <div className="text-md font-semibold space-y-1 mt-1">
                                            <p>Actual Weight: {quote.cargoWeight} MT</p>
                                            <p>Volume: {quote.volume?.toFixed(2)} CBM ({quote.cargoLength}m &times; {quote.cargoWidth}m &times; {quote.cargoHeight}m)</p>
                                            <p className="text-green-300">Chargeable: {quote.chargeableWeight?.toFixed(2)} FRT</p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm text-slate-300">Estimated Price:</p>
                                    <p className="text-2xl font-bold text-green-400">${quote.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h3 className="text-lg font-bold text-gray-800">Contact & Cargo Details</h3>
                                <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-md p-2" />
                                <input type="text" placeholder="Company Name (Optional)" value={company} onChange={e => setCompany(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md p-2" />
                                <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-md p-2" />
                                <input type="text" placeholder="Commodity Type" value={commodity} onChange={e => setCommodity(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-md p-2" />
                                <textarea placeholder="Notes / Special Requirements..." value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full bg-white border border-gray-300 rounded-md p-2"></textarea>
                                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors">Submit Request</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RequestForQuotePage;