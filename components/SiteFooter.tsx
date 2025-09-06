import React from 'react';
import { Page } from '../App';
import Logo from './icons/Logo';
import TwitterIcon from './icons/TwitterIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import FacebookIcon from './icons/FacebookIcon';

interface SiteFooterProps {
  onNavigate: (page: Page) => void;
}

const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const NavLink: React.FC<{page: Page, children: React.ReactNode}> = ({ page, children }) => (
    <li>
      <button onClick={() => onNavigate(page)} className="hover:text-white transition-colors duration-200">
        {children}
      </button>
    </li>
  );

  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1: Logo and Info */}
          <div className="col-span-2 md:col-span-1">
             <button onClick={() => onNavigate('home')} className="flex items-center gap-3">
              <Logo className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white tracking-tight">
                Shipify Logistics
              </span>
            </button>
            <p className="mt-4 text-sm text-slate-400">Global Logistics, Simplified. Your trusted partner for intelligent, end-to-end supply chain solutions.</p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-semibold text-white tracking-wider uppercase">Navigate</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <NavLink page="home">Home</NavLink>
              <NavLink page="about">About Us</NavLink>
              <NavLink page="tariffs">Tariff Search</NavLink>
              <NavLink page="login">Customer Portal</NavLink>
            </ul>
          </div>

          {/* Column 3: Tools */}
           <div>
            <h3 className="font-semibold text-white tracking-wider uppercase">Tools</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <NavLink page="freight">Freight Quote</NavLink>
              <NavLink page="loadcalc">Load Calculator</NavLink>
              <NavLink page="bollard">Bollard Pull Calc</NavLink>
              <NavLink page="seafastening">Sea Fastening Calc</NavLink>
              <NavLink page="ballastcalc">Ballast Calculator</NavLink>
              <NavLink page="mooring">Mooring Calculator</NavLink>
            </ul>
          </div>
          
           {/* Column 4: Operate */}
           <div>
            <h3 className="font-semibold text-white tracking-wider uppercase">Operate</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <NavLink page="tracking">Vessel Tracking</NavLink>
              <NavLink page="livemap">Live Map</NavLink>
              <NavLink page="fleets">My Fleets</NavLink>
            </ul>
          </div>
          
          {/* Column 5: Social */}
          <div>
            <h3 className="font-semibold text-white tracking-wider uppercase">Connect</h3>
            <div className="flex items-center gap-4 mt-4">
                <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <TwitterIcon className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/company/shipify-world/?viewAsMember=true" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <LinkedInIcon className="h-6 w-6" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100082274082025" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    <FacebookIcon className="h-6 w-6" />
                </a>
             </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Shipify Logistics. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;