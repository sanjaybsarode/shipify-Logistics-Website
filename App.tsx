import React, { useState, useEffect } from 'react';
import SiteHeader from './components/SiteHeader';
import HomePage from './components/HomePage';
import TariffSearchPage from './components/TariffSearchPage';
import BollardPullPage from './components/BollardPullPage';
import AboutPage from './components/AboutPage';
import FreightQuotePage from './components/FreightQuotePage';
import SiteFooter from './components/SiteFooter';
import AdminPage from './components/AdminPage';
import VesselTrackingPage from './components/VesselTrackingPage';
import LoadCalculatorPage from './components/LoadCalculatorPage';
import LiveMapPage from './components/MapPage';
import MyFleetsPage from './components/MyFleetsPage';
import LoginPage from './components/LoginPage';
import VesselProfilePage from './components/VesselProfilePage';
import { Tariff, TariffType, Quote, User } from './types';
import { getTariffs, addTariff as addTariffService } from './services/tariffService';
import RequestForQuotePage from './components/RequestForQuotePage';
import SeaFasteningCalculatorPage from './components/SeaFasteningCalculatorPage';
import Chatbot from './components/Chatbot';
import WhatsAppButton from './components/WhatsAppButton';
import { getCurrentUser, logout, updateCurrentUser } from './services/authService';
import MerchantDashboardPage from './components/MerchantDashboardPage';
import AgentDashboardPage from './components/AgentDashboardPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import CreateDeliveryPage from './components/CreateDeliveryPage';
import DeliveryDetailPage from './components/DeliveryDetailPage';
import DashboardLayout from './components/DashboardLayout';
import ProfilePage from './components/ProfilePage';
import BallastCalculatorPage from './components/BallastCalculatorPage';
import MooringCalculatorPage from './components/MooringCalculatorPage';


export type Page = 
  'home' | 'tariffs' | 'bollard' | 'about' | 'freight' | 'admin' | 
  'tracking' | 'loadcalc' | 'seafastening' | 'livemap' | 'fleets' | 
  'login' | 'dashboard' | 'vesselProfile' | 'rfq' | 'ballastcalc' |
  'merchantDashboard' | 'agentDashboard' | 'adminDashboard' | 'createDelivery' | 'deliveryDetail' | 'profile' |
  'mooring';

// Helper component to perform navigation as a side effect, preventing state updates during render.
const Redirect: React.FC<{ to: Page; setPage: (page: Page) => void }> = ({ to, setPage }) => {
  useEffect(() => {
    setPage(to);
  }, [to, setPage]);
  return null; // Render nothing while redirecting
};

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [allTariffs, setAllTariffs] = useState<Tariff[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedImo, setSelectedImo] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [vesselProfileReturnPage, setVesselProfileReturnPage] = useState<Page>('tracking');
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null);

  useEffect(() => {
    setAllTariffs(getTariffs());
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      // If a user is logged in, redirect to their dashboard.
      switch (user.role) {
        case 'Merchant': setPage('merchantDashboard'); break;
        case 'Agent': setPage('agentDashboard'); break;
        case 'Admin': setPage('adminDashboard'); break;
        default: setPage('home');
      }
    }
  }, []);

  const handleAddTariff = (newTariffData: Omit<Tariff, 'id'>) => {
    const newTariff = addTariffService(newTariffData);
    setAllTariffs(prevTariffs => [newTariff, ...prevTariffs]);
  };
  
  const seaPorts = allTariffs.filter(t => t.type === TariffType.SEA && t.lat && t.lon);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    // Redirect based on role
    switch (user.role) {
      case 'Merchant': setPage('merchantDashboard'); break;
      case 'Agent': setPage('agentDashboard'); break;
      case 'Admin': setPage('adminDashboard'); break;
      default: setPage('home');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setPage('home');
  };
  
  const handleViewVesselProfile = (imo: string) => {
    setSelectedImo(imo);
    setVesselProfileReturnPage(page);
    setPage('vesselProfile');
  };
  
  const navigateToRfq = (quote: Quote) => {
    setCurrentQuote(quote);
    setPage('rfq');
  };

  const handleViewDelivery = (deliveryId: string) => {
    setSelectedDeliveryId(deliveryId);
    setPage('deliveryDetail');
  };

  const handleProfileUpdate = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    updateCurrentUser(updatedUser); // Persist change in session
  };
  
  const getDashboardPage = () => {
    if (!currentUser) return 'home';
    switch (currentUser.role) {
      case 'Merchant': return 'merchantDashboard';
      case 'Agent': return 'agentDashboard';
      case 'Admin': return 'adminDashboard';
      default: return 'home';
    }
  }

  const renderPage = () => {
    // Public pages
    if (!currentUser) {
       switch (page) {
          case 'home': return <HomePage onNavigateToTariffs={() => setPage('tariffs')} />;
          case 'tariffs': return <TariffSearchPage allTariffs={allTariffs} />;
          case 'bollard': return <BollardPullPage />;
          case 'about': return <AboutPage />;
          case 'freight': return <FreightQuotePage seaPorts={seaPorts} onRequestQuote={navigateToRfq} />;
          case 'rfq': return <RequestForQuotePage onBack={() => setPage('freight')} quote={currentQuote} />;
          case 'tracking': return <VesselTrackingPage onViewVesselProfile={handleViewVesselProfile} />;
          case 'loadcalc': return <LoadCalculatorPage />;
          case 'seafastening': return <SeaFasteningCalculatorPage />;
          case 'ballastcalc': return <BallastCalculatorPage />;
          case 'mooring': return <MooringCalculatorPage />;
          case 'livemap': return <LiveMapPage />;
          case 'fleets': return <MyFleetsPage />;
          case 'login': return <LoginPage onLogin={handleLogin} />;
          case 'vesselProfile': return selectedImo ? <VesselProfilePage imo={selectedImo} onBack={() => setPage(vesselProfileReturnPage)} /> : null;
          default: return <HomePage onNavigateToTariffs={() => setPage('tariffs')} />;
      }
    }
    
    // Logged-in user pages (wrapped in DashboardLayout)
    let pageContent: React.ReactNode;
    switch (page) {
      case 'merchantDashboard':
        pageContent = <MerchantDashboardPage user={currentUser} onViewDelivery={handleViewDelivery} onCreateDelivery={() => setPage('createDelivery')} />;
        break;
      case 'createDelivery':
        pageContent = <CreateDeliveryPage user={currentUser} onDeliveryCreated={() => setPage('merchantDashboard')} onBack={() => setPage('merchantDashboard')} />;
        break;
      case 'deliveryDetail':
        pageContent = selectedDeliveryId ? <DeliveryDetailPage deliveryId={selectedDeliveryId} user={currentUser} onBack={() => setPage(getDashboardPage())} /> : null;
        break;
      case 'agentDashboard':
        pageContent = <AgentDashboardPage user={currentUser} onViewDelivery={handleViewDelivery} />;
        break;
      case 'adminDashboard':
        pageContent = <AdminDashboardPage onViewDelivery={handleViewDelivery} />;
        break;
      case 'admin':
        pageContent = <AdminPage onAddTariff={handleAddTariff} allTariffs={allTariffs} />;
        break;
      case 'profile':
        pageContent = <ProfilePage user={currentUser} onProfileUpdate={handleProfileUpdate} />;
        break;
      // Allow logged-in users to view vessel profiles within the dashboard layout
      case 'vesselProfile':
        pageContent = selectedImo ? <VesselProfilePage imo={selectedImo} onBack={() => setPage(vesselProfileReturnPage)} /> : null;
        break;
      default:
        // Redirect to main dashboard if page is not found for a logged-in user.
        // This is an invalid state, so we navigate away. Using a component to do this in an effect
        // avoids calling setPage during render, which causes errors.
        return <Redirect to={getDashboardPage()} setPage={setPage} />;
    }
    
    return <DashboardLayout user={currentUser} onNavigate={setPage} onLogout={handleLogout} currentPage={page}>{pageContent}</DashboardLayout>;
  }
  
  const isPublicPage = !currentUser;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {isPublicPage && <SiteHeader onNavigate={setPage} currentPage={page} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {isPublicPage && <SiteFooter onNavigate={setPage} />}
      {isPublicPage && <WhatsAppButton phoneNumber="919664377717" />}
      {isPublicPage && <Chatbot />}
    </div>
  );
};

export default App;