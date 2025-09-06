import React from 'react';
import { Tariff } from '../types';
import CloseIcon from './icons/CloseIcon';

interface TariffDetailModalProps {
  tariff: Tariff;
  onClose: () => void;
}

const TariffDetailModal: React.FC<TariffDetailModalProps> = ({ tariff, onClose }) => {
  // Prevent clicks inside the modal from closing it
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={handleModalContentClick}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">{tariff.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1"
            aria-label="Close modal"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Code</p>
              <p className="font-mono text-gray-800">{tariff.code}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Country</p>
              <p className="text-gray-800">{tariff.country}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Type</p>
              <p className="text-gray-800">{tariff.type}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Full Tariff Details:</h3>
            <pre className="text-gray-800 text-sm whitespace-pre-wrap font-sans bg-gray-50 p-4 rounded-md border max-h-96 overflow-y-auto">
              {tariff.details}
            </pre>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="p-4 border-t bg-gray-50 text-right rounded-b-lg">
            <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors"
            >
                Close
            </button>
        </footer>
      </div>
    </div>
  );
};

export default TariffDetailModal;