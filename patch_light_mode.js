const fs = require('fs');
const path = require('path');

const files = [
  'CustomersList.jsx',
  'GRNList.jsx',
  'InvoicesList.jsx',
  'JobsList.jsx',
  'SuppliersList.jsx',
  'UsersList.jsx',
  'VehiclesList.jsx'
];

const DIR = 'd:/pp/inventory-management/branch-sales-management/src/pages';

files.forEach(fileName => {
  const filePath = path.join(DIR, fileName);
  if (!fs.existsSync(filePath)) return;
  
  let code = fs.readFileSync(filePath, 'utf8');

  // Headers / Toolbars
  code = code.replace(/bg-zinc-900\/50 backdrop-blur-md border-b border-white\/5/g, 'bg-white/60 dark:bg-zinc-900/50 backdrop-blur-md border-b border-zinc-200 dark:border-white/5 transition-colors');
  code = code.replace(/text-white leading-none/g, 'text-zinc-900 dark:text-white leading-none');
  
  // Search inputs
  code = code.replace(/bg-zinc-950\/60 border border-zinc-800(.*?)text-zinc-200 placeholder-zinc-600/g, 'bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800$1text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 transition-colors');
  
  // Main Table Container
  code = code.replace(/bg-zinc-900\/40 flex-1 backdrop-blur border border-white\/5 rounded-2xl flex flex-col overflow-hidden shadow-xl/g, 'bg-white dark:bg-zinc-900/40 flex-1 backdrop-blur border border-zinc-200 dark:border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-sm dark:shadow-xl transition-colors');
  
  // Table thead
  code = code.replace(/bg-zinc-950\/95 backdrop-blur-xl shadow-\[0_1px_0_rgba\(255,255,255,0\.1\)\] text-zinc-400/g, 'bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_rgba(255,255,255,0.1)] text-zinc-500 dark:text-zinc-400 transition-colors');
  
  // Table tbody
  code = code.replace(/divide-white\/5/g, 'divide-zinc-200 dark:divide-white/5');
  
  // Table rows hover
  code = code.replace(/hover:bg-white\/\[0\.02\]/g, 'hover:bg-zinc-50 dark:hover:bg-white/[0.02]');
  
  // Modal Backdrop
  code = code.replace(/bg-zinc-950\/80 backdrop-blur-sm/g, 'bg-black/40 dark:bg-zinc-950/80 backdrop-blur-sm transition-colors');
  
  // Modal Body
  code = code.replace(/bg-zinc-900 border border-white\/10 shadow-2xl/g, 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-2xl transition-colors');
  code = code.replace(/bg-zinc-900 border border-white\/10 shadow-xl/g, 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-xl transition-colors');
  
  // Refresh button & standard buttons
  code = code.replace(/bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-(\w+)-400 hover:border-(\w+)-500\/30/g, 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-$1-600 dark:hover:text-$1-400 hover:border-$2-500/30 transition-colors shadow-sm dark:shadow-none');
  
  // Stats row counters
  code = code.replace(/<span className="text-white font-semibold">/g, '<span className="text-zinc-900 dark:text-white font-semibold">');
  
  // General text headings
  code = code.replace(/text-white mb-0\.5/g, 'text-zinc-900 dark:text-white mb-0.5'); // Row titles
  code = code.replace(/text-lg font-bold text-white/g, 'text-lg font-bold text-zinc-900 dark:text-white'); // Modal titles
  code = code.replace(/text-white block mb-0\.5/g, 'text-zinc-900 dark:text-white block mb-0.5'); // More titles
  code = code.replace(/text-white font-bold/g, 'text-zinc-900 dark:text-white font-bold'); // More text

  // Pagination
  code = code.replace(/bg-zinc-900\/50 border border-zinc-800 rounded-2xl p-1\.5 shadow-lg/g, 'bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-1.5 shadow-sm dark:shadow-lg transition-colors');
  code = code.replace(/bg-zinc-800 text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-700/g, 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700');
  
  fs.writeFileSync(filePath, code);
  console.log(`Updated ${fileName}`);
});
