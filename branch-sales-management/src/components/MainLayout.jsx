import React from 'react';
import Sidebar from './Sidebar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 overflow-hidden font-sans transition-colors duration-300 selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-200">
            {/* Sidebar only takes space on desktop (lg+); hidden on mobile */}
            <Sidebar />
            {/* Main takes full width on mobile, remaining space on desktop */}
            <main className="flex-1 min-w-0 overflow-hidden relative">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
