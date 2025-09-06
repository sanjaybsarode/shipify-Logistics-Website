import React from 'react';
import ShipIcon from './icons/ShipIcon';
import PlaneIcon from './icons/PlaneIcon';
import TruckIcon from './icons/TruckIcon';
import WarehouseIcon from './icons/WarehouseIcon';
import CustomsIcon from './icons/CustomsIcon';
import ConsultingIcon from './icons/ConsultingIcon';
import EngineeringIcon from './icons/EngineeringIcon';
import RailwayIcon from './icons/RailwayIcon';
import ProjectLogisticsIcon from './icons/ProjectLogisticsIcon';
import AnimatedStats from './AnimatedStats';


interface HomePageProps {
  onNavigateToTariffs: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToTariffs }) => {
  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative bg-slate-800 text-white bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578574577315-3f160d00976b?q=80&w=2070&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
        <div className="relative container mx-auto px-4 pt-24 md:pt-32 pb-16 md:pb-24 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Global Logistics, Simplified.
            </h1>
            <p className="mt-4 md:mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-300">
                Shipify offers a complete suite of intelligent, end-to-end logistics solutions. From freight and warehousing to customs and consulting, optimize your entire supply chain with our powerful platform.
            </p>
            <button
              onClick={onNavigateToTariffs}
              className="mt-8 bg-green-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Explore Global Tariffs
            </button>
        </div>
        <div className="relative container mx-auto px-4 pb-12 -mt-12 md:-mt-20">
             <AnimatedStats />
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-slate-50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="text-base font-semibold text-green-600 tracking-wider uppercase">Our Services</h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    Comprehensive Logistics Solutions
                </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                        <ShipIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">Ocean Freight</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Reliable and cost-effective sea shipping solutions for full container load (FCL) and less-than-container load (LCL) shipments worldwide.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                        <PlaneIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">Air Freight</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Expedited air cargo services for time-sensitive shipments, ensuring your goods arrive quickly and securely at their destination.
                    </p>
                </div>
                 <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                        <TruckIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">Road Freight</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Flexible and reliable domestic and cross-border trucking services for shipments of all sizes, from partial to full truckloads.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                        <WarehouseIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">Warehousing & Distribution</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Secure, state-of-the-art warehousing facilities and fulfillment services to manage your inventory and streamline distribution.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                        <CustomsIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">Customs Brokerage</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Expert customs clearance services to ensure your shipments navigate complex international trade regulations without delay.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                        <ConsultingIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">Supply Chain Consulting</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Strategic insights and data-driven analysis to help you optimize your logistics network, reduce costs, and improve efficiency.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                        <EngineeringIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">Engineering Services</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Specialized engineering solutions to design, optimize, and manage your logistics infrastructure, from warehouse layouts to complex supply chain modeling.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                        <RailwayIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">Railway Logistics</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Efficient and sustainable rail freight services for long-haul and bulk transportation, connecting key inland economic hubs across continents.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-slate-700 text-white">
                        <ProjectLogisticsIcon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">Project Logistics</h3>
                    <p className="mt-2 text-base text-gray-500">
                        Expert management of oversized, heavy-lift, and high-value cargo for large-scale industrial, energy, and infrastructure projects from start to finish.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;