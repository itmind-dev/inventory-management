import React, { Suspense, lazy, useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const InventoryExplorer = lazy(() => import('./pages/InventoryExplorer'));
const InventoryOnline = lazy(() => import('./pages/InventoryOnline'));
const CustomersList = lazy(() => import('./pages/CustomersList'));
const VehiclesList = lazy(() => import('./pages/VehiclesList'));
const InvoicesList = lazy(() => import('./pages/InvoicesList'));
const SuppliersList = lazy(() => import('./pages/SuppliersList'));
const GRNList = lazy(() => import('./pages/GRNList'));
const JobsList = lazy(() => import('./pages/JobsList'));
const UsersList = lazy(() => import('./pages/UsersList'));

const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-zinc-300">
    <div className="w-12 h-12 border-4 border-zinc-800 border-t-emerald-500 rounded-full animate-spin mb-4" />
    <p className="font-medium tracking-wide italic">Retrieving Business Data...</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Navigate to="/inventory" replace />} />
            <Route path="/inventory" element={<InventoryExplorer />} />
            <Route path="/inventory-online" element={<InventoryOnline />} />
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/vehicles" element={<VehiclesList />} />
            <Route path="/invoices" element={<InvoicesList />} />
            <Route path="/suppliers" element={<SuppliersList />} />
            <Route path="/grns" element={<GRNList />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="*" element={<Navigate to="/inventory" replace />} />
          </Routes>
        </Suspense>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
