
import React from 'react';
import { Page } from '../App';
import { User } from '../types';
import Logo from './icons/Logo';
import DashboardIcon from './icons/DashboardIcon';
import DeliveryIcon from './icons/DeliveryIcon';
import AdminSettingsIcon from './icons/AdminSettingsIcon';
import ProfileIcon from './icons/ProfileIcon';
import LogoutIcon from './icons/LogoutIcon';

interface DashboardLayoutProps {
    user: User;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
    currentPage: Page;
    children: React.ReactNode;
}

const SIDEBAR_LINKS: { [key in User['role']]: { page: Page; label: string; icon: React.FC<any> }[] } = {
    Merchant: [
        { page: 'merchantDashboard', label: 'My Deliveries', icon: DashboardIcon },
        { page: 'createDelivery', label: 'Create Delivery', icon: DeliveryIcon },
    ],
    Agent: [
        { page: 'agentDashboard', label: 'Agent Dashboard', icon: DashboardIcon },
    ],
    Admin: [
        { page: 'adminDashboard', label: 'All Deliveries', icon: DashboardIcon },
        { page: 'admin', label: 'App Settings', icon: AdminSettingsIcon },
    ]
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onNavigate, onLogout, currentPage, children }) => {
    
    const navLinks = SIDEBAR_LINKS[user.role] || [];
    
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 text-white flex flex-col">
                <div className="flex items-center gap-3 p-4 border-b border-slate-700">
                    <Logo className="h-8 w-8 text-white" />
                    <span className="text-xl font-bold tracking-tight">
                    Shipify Portal
                    </span>
                </div>
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navLinks.map(({ page, label, icon: Icon }) => {
                        const isActive = currentPage === page;
                        return (
                            <button
                                key={page}
                                onClick={() => onNavigate(page)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive 
                                    ? 'bg-green-600 text-white' 
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{label}</span>
                            </button>
                        )
                    })}
                </nav>
                <div className="p-2 border-t border-slate-700 space-y-1">
                     <button
                        onClick={() => onNavigate('profile')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            currentPage === 'profile' 
                            ? 'bg-slate-700 text-white' 
                            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                    >
                        <ProfileIcon className="h-5 w-5" />
                        <span>My Profile</span>
                    </button>
                     <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
                    >
                        <LogoutIcon className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm p-4 border-b">
                    <div className="flex justify-end items-center">
                        <div className="text-sm">
                            Welcome, <span className="font-semibold">{user.name}</span> ({user.role})
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
