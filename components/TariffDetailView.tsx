
import React, { useState, useEffect, useCallback } from 'react';
import { Tariff } from '../types';
import { getTariffExplanation } from '../services/geminiService';
import AiSparkleIcon from './icons/AiSparkleIcon';
import ShipIcon from './icons/ShipIcon';
import PlaneIcon from './icons/PlaneIcon';
import { TariffType } from '../types';

interface TariffDetailViewProps {
  tariff: Tariff;
}

const TariffDetailView: React.FC<TariffDetailViewProps> = ({ tariff }) => {
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Reset AI response whenever a new tariff is selected
  useEffect(() => {
    setAiResponse('');
    setIsLoadingAi(false);
  }, [tariff]);

  const handleAskAi = useCallback(async () => {
    setIsLoadingAi(true);
    setAiResponse('');
    try {
      const explanation = await getTariffExplanation(tariff);
      setAiResponse(explanation);
    } catch (error) {
      console.error("Error fetching AI explanation:", error);
      setAiResponse("Sorry, I couldn't process that request. Please try again.");
    } finally {
      setIsLoadingAi(false);
    }
  }, [tariff]);
  
  const Icon = tariff.type === TariffType.SEA ? ShipIcon : PlaneIcon;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <header className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500">{tariff.country} / {tariff.type}</p>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1">{tariff.name}</h2>
                </div>
                <span className="text-sm font-mono bg-gray-200 text-slate-800 px-3 py-1.5 rounded-md">{tariff.code}</span>
            </div>
        </header>

        <main className="p-6">
            <div>
                <h4 className="font-semibold text-gray-700 mb-2">Tariff Details:</h4>
                <pre className="text-gray-800 text-sm whitespace-pre-wrap font-sans bg-gray-50 p-4 rounded-md border">{tariff.details}</pre>
            </div>
          
            <div className="border-t border-gray-200 pt-6 mt-6">
                <button
                    onClick={handleAskAi}
                    disabled={isLoadingAi}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-colors"
                >
                    <AiSparkleIcon className="h-5 w-5"/>
                    {isLoadingAi ? 'AI is thinking...' : 'Ask AI to Explain This'}
                </button>
            </div>

            {(isLoadingAi || aiResponse) && (
                <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <AiSparkleIcon className="h-5 w-5 text-green-500"/>
                        AI Explanation
                    </h4>
                    {isLoadingAi && !aiResponse && (
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-md animate-pulse">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        </div>
                    )}
                    {aiResponse && (
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-md prose prose-sm max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br />') }}>
                        </div>
                    )}
                </div>
            )}
        </main>
    </div>
  );
};

export default TariffDetailView;
