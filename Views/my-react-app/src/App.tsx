import { MenuView } from './components/MenuView';
import { OrderHistory } from './components/OrderHistory';
import { WelcomePage } from './components/WelcomePage';
import { useState, useEffect } from 'react';


export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'menu' | 'history'>('welcome');

  // Chỉ xoá localStorage khi app được mở lại, KHÔNG xoá khi reload
  useEffect(() => {
    const sessionStarted = sessionStorage.getItem("session_active");

    if (!sessionStarted) {
      localStorage.removeItem("orderHistory");
      sessionStorage.setItem("session_active", "true");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] w-full overflow-x-auto">
      <div className="min-w-[1440px]">
        {currentView === 'welcome' ? (
          <WelcomePage onStartOrdering={() => setCurrentView('menu')} />
        ) : currentView === 'menu' ? (
          <MenuView onViewHistory={() => setCurrentView('history')} />
        ) : (
          <OrderHistory onBack={() => setCurrentView('menu')} />
        )}
      </div>
    </div>
  );
}