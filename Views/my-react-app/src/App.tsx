import { useState } from 'react';
import { MenuView } from './components/MenuView';
import { OrderHistory } from './components/OrderHistory';
import { WelcomePage } from './components/WelcomePage';

export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'menu' | 'history'>('welcome');

  return (
    <div className="min-h-screen bg-[#1a1a1a] min-w-[1440px]">
      {currentView === 'welcome' ? (
        <WelcomePage onStartOrdering={() => setCurrentView('menu')} />
      ) : currentView === 'menu' ? (
        <MenuView onViewHistory={() => setCurrentView('history')} />
      ) : (
        <OrderHistory onBack={() => setCurrentView('menu')} />
      )}
    </div>
  );
}