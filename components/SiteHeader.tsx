import React, { useState, useRef } from 'react';
import { Page } from '../App';
import Logo from './icons/Logo';
import { User } from '../types';

interface SiteHeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  currentUser: User | null;
  onLogout: () => void;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ onNavigate, currentPage, currentUser, onLogout }) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isOperateOpen, setIsOperateOpen] = useState(false);

  const toolsTimeoutRef = useRef<number | null>(null);
  const operateTimeoutRef = useRef<number | null>(null);

  const handleMenuEnter = (setter: React.Dispatch<React.SetStateAction<boolean>>, timeoutRef: React.MutableRefObject<number | null>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setter(true);
  };

  const handleMenuLeave = (setter: React.Dispatch<React.SetStateAction<boolean>>, timeoutRef: React.MutableRefObject<number | null>) => {
    timeoutRef.current = window.setTimeout(() => {
      setter(false);
    }, 200); // A small delay to allow moving mouse to dropdown
  };

  const navLinkClasses = (page: Page | Page[]) => {
    const pages = Array.isArray(page) ? page : [page];
    const isActive = pages.some(p => currentPage === p);
    
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
      ? 'bg-green-100 text-green-700' 
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
    }`;
  }
  
  const dropdownLinkClasses = (page: Page) => `block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${currentPage === page ? 'font-semibold text-green-700' : ''}`;

  const isToolsActive = ['freight', 'loadcalc', 'bollard', 'rfq', 'seafastening', 'ballastcalc', 'mooring'].includes(currentPage);
  const isOperateActive = ['tracking', 'livemap', 'fleets', 'vesselProfile'].includes(currentPage);
  
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
            <Logo className="h-8 w-8 text-slate-800" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Shipify Logistics
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            <button onClick={() => onNavigate('home')} className={navLinkClasses('home')}>
              Home
            </button>
            <button onClick={() => onNavigate('tariffs')} className={navLinkClasses('tariffs')}>
              Tariff Search
            </button>
            
            <div 
              className="relative"
              onMouseEnter={() => handleMenuEnter(setIsToolsOpen, toolsTimeoutRef)}
              onMouseLeave={() => handleMenuLeave(setIsToolsOpen, toolsTimeoutRef)}
            >
                <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${isToolsActive ? 'text-green-700' : 'text-gray-500'} hover:bg-gray-100 hover:text-gray-900`}>
                    Tools
                    <svg className={`w-4 h-4 ml-1 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isToolsOpen && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 py-1 w-48 z-40 border">
                      <button onClick={() => onNavigate('freight')} className={dropdownLinkClasses('freight')}>Freight Quote</button>
                      <button onClick={() => onNavigate('loadcalc')} className={dropdownLinkClasses('loadcalc')}>Load Calculator</button>
                      <button onClick={() => onNavigate('bollard')} className={dropdownLinkClasses('bollard')}>Bollard Pull</button>
                      <button onClick={() => onNavigate('seafastening')} className={dropdownLinkClasses('seafastening')}>Sea Fastening Calc</button>
                      <button onClick={() => onNavigate('ballastcalc')} className={dropdownLinkClasses('ballastcalc')}>Ballast Calculator</button>
                      <button onClick={() => onNavigate('mooring')} className={dropdownLinkClasses('mooring')}>Mooring Calculator</button>
                  </div>
                )}
            </div>

            <div 
              className="relative"
              onMouseEnter={() => handleMenuEnter(setIsOperateOpen, operateTimeoutRef)}
              onMouseLeave={() => handleMenuLeave(setIsOperateOpen, operateTimeoutRef)}
            >
                <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${isOperateActive ? 'text-green-700' : 'text-gray-500'} hover:bg-gray-100 hover:text-gray-900`}>
                    Operate
                    <svg className={`w-4 h-4 ml-1 transition-transform ${isOperateOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isOperateOpen && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 py-1 w-48 z-40 border">
                     <button onClick={() => onNavigate('tracking')} className={dropdownLinkClasses('tracking')}>Vessel Tracking</button>
                     <button onClick={() => onNavigate('livemap')} className={dropdownLinkClasses('livemap')}>Live Map</button>
                     <button onClick={() => onNavigate('fleets')} className={dropdownLinkClasses('fleets')}>My Fleets</button>
                  </div>
                )}
            </div>

            <button onClick={() => onNavigate('about')} className={navLinkClasses('about')}>
              About Us
            </button>
            
            <div className="ml-4 pl-4 border-l">
              <button onClick={() => onNavigate('login')} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-sm hover:bg-green-600 transition-colors text-sm">
                Customer Portal
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;