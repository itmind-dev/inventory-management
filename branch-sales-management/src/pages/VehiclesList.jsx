import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    TruckIcon,
    XMarkIcon,
    ArrowPathIcon,
    TagIcon,
    IdentificationIcon,
    UserCircleIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/vehicles';

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const scrollRef = useRef(null);

    const fetchVehicles = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page,
                size: 20,
                sortField: 'licensePlateNumber',
                sortDir: 'ASC'
            };
            if (searchQuery) params.search = searchQuery;

            const res = await axios.get(API_URL, { params });
            setVehicles(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error("Failed to fetch vehicles", err);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, page]);

    useEffect(() => {
        setPage(0);
    }, [searchQuery]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchVehicles();
        }, 400);
        return () => clearTimeout(timer);
    }, [fetchVehicles]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            {/* Page Header */}
            <header className="h-20 shrink-0 bg-zinc-50 dark:bg-zinc-900/40 backdrop-blur-md border-b border-zinc-200 dark:border-white/5 flex items-center px-10 relative">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                        Vehicle <span className="text-emerald-500">Fleet</span>
                    </h1>
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest">Registered Machines & Equipment</p>
                </div>

                <div className="ml-auto w-96 relative group">
                    <MagnifyingGlassIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-500 absolute left-4 top-1/2 transform -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by Plate Number, Brand, or Model..."
                        className="w-full bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 text-sm rounded-full pl-11 p-2.5 outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-zinc-900 dark:text-zinc-200"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:text-white">
                            <XMarkIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </header>

            <main ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-10">
                {loading && vehicles.length === 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-44 bg-zinc-50 dark:bg-zinc-900/40 animate-pulse rounded-3xl border border-zinc-200 dark:border-white/5"></div>
                        ))}
                    </div>
                ) : (
                    <>
                        {vehicles.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-96 text-zinc-500 dark:text-zinc-500">
                                <TruckIcon className="w-16 h-16 mb-4 opacity-20" />
                                <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">No Vehicles Registered</p>
                            </div>
                        ) : (
                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {vehicles.map((vehicle) => (
                                    <motion.div 
                                        key={vehicle.id}
                                        variants={itemVariants}
                                        className="bg-zinc-50 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200 dark:border-white/5 hover:border-emerald-500/30 rounded-3xl p-6 transition-all duration-300 relative group overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors"></div>
                                        
                                        <div className="flex items-center space-x-4 mb-6 relative z-10">
                                            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-emerald-400 shadow-inner">
                                                <TruckIcon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-zinc-900 dark:text-white text-lg group-hover:text-emerald-400 transition-colors">{vehicle.licensePlateNumber}</h3>
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 font-mono">{vehicle.brand} {vehicle.model}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4 relative z-10">
                                            <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/40 border border-zinc-200 dark:border-white/5 group-hover:border-emerald-500/10 transition-colors">
                                                <div className="flex items-center space-x-3 text-sm text-zinc-600 dark:text-zinc-400">
                                                    <UserCircleIcon className="w-4 h-4 text-emerald-500/60" />
                                                    <span className="font-medium text-zinc-300">{vehicle.customer?.name || 'Unknown Owner'}</span>
                                                </div>
                                                <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-tight">OWNER</span>
                                            </div>
                                            
                                            <div className="flex items-center space-x-3 text-sm text-zinc-500 dark:text-zinc-500 pl-3">
                                                <TagIcon className="w-4 h-4 text-emerald-500/60" />
                                                <span className="text-xs uppercase font-bold tracking-wider">{vehicle.type || 'Standard Vehicle'}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                        
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12 pb-12">
                                <div className="flex space-x-2 bg-white/80 dark:bg-zinc-900/50 backdrop-blur p-2 rounded-2xl border border-zinc-800">
                                    <button 
                                        disabled={page === 0}
                                        onClick={() => setPage(page - 1)}
                                        className="px-4 py-2 rounded-xl text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition"
                                    >
                                        Prev
                                    </button>
                                    <div className="flex items-center px-4 font-mono text-sm text-zinc-600 dark:text-zinc-400">
                                        Page <span className="text-zinc-900 dark:text-white mx-2">{page + 1}</span> of <span className="text-zinc-900 dark:text-white ml-2">{totalPages}</span>
                                    </div>
                                    <button 
                                        disabled={page === totalPages - 1}
                                        onClick={() => setPage(page + 1)}
                                        className="px-4 py-2 rounded-xl text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default VehiclesList;
