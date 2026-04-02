import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CubeIcon,
    UsersIcon,
    TruckIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ChartBarIcon,
    WrenchScrewdriverIcon,
    ShoppingBagIcon,
    Bars3Icon,
    XMarkIcon,
    TableCellsIcon,
    SunIcon,
    MoonIcon,
} from '@heroicons/react/24/outline';
import { ThemeContext } from '../App';

const navItems = [
    { name: 'Inventory',   path: '/inventory', icon: CubeIcon },
    { name: 'Inventory Online', path: '/inventory-online', icon: TableCellsIcon },
    { name: 'Customers',   path: '/customers', icon: UsersIcon },
    { name: 'Vehicles',    path: '/vehicles',  icon: TruckIcon },
    { name: 'Invoices',    path: '/invoices',  icon: DocumentTextIcon },
    { name: 'Suppliers',   path: '/suppliers', icon: ChartBarIcon },
    { name: 'GRNs',        path: '/grns',      icon: ShoppingBagIcon },
    { name: 'Repair Jobs', path: '/jobs',      icon: WrenchScrewdriverIcon },
    { name: 'Staff Users', path: '/users',     icon: UserGroupIcon },
];

/* ─── Shared nav list ─── */
const NavList = ({ onNavigate }) => (
    <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
            <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        isActive
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/5 dark:hover:text-zinc-200 border border-transparent'
                    }`
                }
            >
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>{item.name}</span>
            </NavLink>
        ))}
    </nav>
);

/* ─── Brand block ─── */
const Brand = () => (
    <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[10px] flex items-center justify-center transition-colors">
                <WrenchScrewdriverIcon className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
            </div>
        </div>
        <div>
            <h1 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                ITMind <span className="text-emerald-600 dark:text-emerald-500 text-xs block mt-0.5 opacity-80">DASHBOARD</span>
            </h1>
        </div>
    </div>
);

/* ─── User block ─── */
const UserBlock = () => {
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    
    return (
        <div className="p-4 border-t border-zinc-200 dark:border-white/5 transition-colors">
            <div className="bg-zinc-100 dark:bg-zinc-800/30 rounded-xl p-3 flex items-center justify-between transition-colors">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                        OW
                    </div>
                    <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-white">Owner Portal</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Read Only Access</p>
                    </div>
                </div>
                
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-200 hover:text-emerald-600 dark:hover:bg-white/10 dark:hover:text-emerald-400 transition-all active:scale-95"
                    title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                >
                    {theme === 'dark' ? (
                        <SunIcon className="w-5 h-5" />
                    ) : (
                        <MoonIcon className="w-5 h-5" />
                    )}
                </button>
            </div>
        </div>
    );
};

const Sidebar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            {/* ════════════════════════════════
                DESKTOP SIDEBAR  (lg and above)
            ════════════════════════════════ */}
            <aside className="hidden lg:flex w-64 h-screen bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border-r border-zinc-200 dark:border-white/5 flex-col shrink-0 transition-colors">
                <Brand />
                <NavList />
                <UserBlock />
            </aside>

            {/* ════════════════════════════════
                MOBILE – floating hamburger btn
            ════════════════════════════════ */}
            <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden fixed bottom-5 left-4 z-40 w-12 h-12 rounded-2xl bg-emerald-600 shadow-2xl shadow-emerald-900/60 flex items-center justify-center text-white active:scale-95 transition-transform"
                aria-label="Open navigation"
            >
                <Bars3Icon className="w-6 h-6" />
            </button>

            {/* ════════════════════════════════
                MOBILE DRAWER
            ════════════════════════════════ */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerOpen(false)}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                        />

                        {/* Drawer panel */}
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 h-full w-72 z-50 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/10 flex flex-col lg:hidden shadow-2xl transition-colors"
                        >
                            {/* Close button */}
                            <div className="flex items-center justify-between pr-4">
                                <Brand />
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-all"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <NavList onNavigate={() => setDrawerOpen(false)} />
                            <UserBlock />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
