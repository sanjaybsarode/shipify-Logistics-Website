import React, { useState } from 'react';
import { User } from '../types';
import { createDelivery } from '../services/deliveryService';

interface CreateDeliveryPageProps {
    user: User;
    onDeliveryCreated: () => void;
    onBack: () => void;
}

const CreateDeliveryPage: React.FC<CreateDeliveryPageProps> = ({ user, onDeliveryCreated, onBack }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const isFormValid = origin && destination && recipientName && recipientPhone;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await createDelivery(user, origin, destination, recipientName, recipientPhone);
            onDeliveryCreated();
        } catch (error) {
            console.error("Failed to create delivery:", error);
            // In a real app, show an error message to the user
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
             <button onClick={onBack} className="mb-6 text-sm text-green-600 hover:text-green-800 font-semibold">
                &larr; Back to Dashboard
            </button>
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Create a New Delivery
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500">
                       Fill in the details below to schedule a new delivery order.
                    </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Origin & Destination</h3>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Origin Address</label>
                                    <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} required placeholder="e.g., 123 Warehouse Rd, City, Country" className="w-full bg-white border border-gray-300 rounded-md p-2"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination Address</label>
                                    <input type="text" value={destination} onChange={e => setDestination(e.target.value)} required placeholder="e.g., 456 Customer Ave, City, Country" className="w-full bg-white border border-gray-300 rounded-md p-2"/>
                                </div>
                            </div>
                        </div>
                         <div>
                            <h3 className="text-lg font-bold text-gray-800">Recipient Information</h3>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                                    <input type="text" value={recipientName} onChange={e => setRecipientName(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-md p-2"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Phone</label>
                                    <input type="tel" value={recipientPhone} onChange={e => setRecipientPhone(e.target.value)} required className="w-full bg-white border border-gray-300 rounded-md p-2"/>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t">
                            <button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-colors"
                            >
                                {isSubmitting ? 'Submitting...' : 'Create Delivery Order'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDeliveryPage;