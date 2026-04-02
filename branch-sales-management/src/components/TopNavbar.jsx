import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    CubeIcon,
    UsersIcon,
    TruckIcon,
    DocumentTextIcon,
    ChartBarIcon,
    ShoppingBagIcon,
    WrenchScrewdriverIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';

const navItems = [
    { name: 'Inventory',   path: '/inventory', icon: CubeIcon },
    { name: 'Customers',   path: '/customers', icon: UsersIcon },
    { name: 'Vehicles',    path: '/vehicles',  icon: TruckIcon },
    { name: 'Invoices',    path: '/invoices',  icon: DocumentTextIcon },
    { name: 'Suppliers',   path: '/suppliers', icon: ChartBarIcon },
    { name: 'GRNs',        path: '/grns',      icon: ShoppingBagIcon },
    { name: 'Jobs',        path: '/jobs',      icon: WrenchScrewdriverIcon },
    { name: 'Staff',       path: '/users',     icon: UserGroupIcon },
];

const TopNavbar = () => {
    return (
        <header className="shrink-0 h-14 bg-zinc-900/70 backdrop-blur-xl border-b border-white/5 flex items-center px-3 sm:px-4 gap-1 overflow-x-auto scrollbar-none">
            {/* Brand */}
            <div className="flex items-center gap-2 mr-3 shrink-0">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow shadow-emerald-500/30">
                    <WrenchScrewdriverIcon className="w-4 h-4 text-zinc-950" />
                </div>
                <span className="font-black text-sm text-white tracking-tight hidden sm:block">
                    ITMind
                </span>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-zinc-800 mr-1 shrink-0" />

            {/* Nav items */}
            <nav className="flex items-center gap-0.5 flex-nowrap">
                {navItems.map(({ name, path, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 shrink-0 whitespace-nowrap ${
                                isActive
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
                            }`
                        }
                    >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="hidden sm:inline">{name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Right – user badge */}
            <div className="ml-auto pl-3 shrink-0 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-[10px]">
                    OW
                </div>
                <span className="text-[10px] text-zinc-500 hidden md:block font-medium">Owner</span>
            </div>
        </header>
    );
};

export default TopNavbar;
