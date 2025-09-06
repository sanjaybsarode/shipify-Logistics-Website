
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-50 to-gray-100 border-b border-slate-200 sticky top-[64px] z-20">
      <div className="container mx-auto px-4 py-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            Global Tariff Directory
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Search and understand port & airport tariffs with our AI-powered tools.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;