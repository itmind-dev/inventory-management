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

  // Input fields
  code = code.replace(/bg-zinc-950\/50 border border-zinc-800/g, 'bg-white dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800');
  code = code.replace(/text-zinc-200/g, 'text-zinc-900 dark:text-zinc-200');
  code = code.replace(/placeholder-zinc-600/g, 'placeholder-zinc-400 dark:placeholder-zinc-600');
  
  // Cards and containers
  code = code.replace(/bg-zinc-900\/40(?!.*dark:)/g, 'bg-zinc-50 dark:bg-zinc-900/40');
  code = code.replace(/border-white\/5(?!.*dark:)/g, 'border-zinc-200 dark:border-white/5');
  
  // Icon blocks
  code = code.replace(/bg-zinc-800(?!.*dark:)/g, 'bg-zinc-100 dark:bg-zinc-800');
  code = code.replace(/border-zinc-700(?!.*dark:)/g, 'border-zinc-200 dark:border-zinc-700');
  
  // Text modifications
  code = code.replace(/text-white(?!.*dark:)/g, 'text-zinc-900 dark:text-white');
  code = code.replace(/text-zinc-400(?!.*dark:)/g, 'text-zinc-600 dark:text-zinc-400');
  code = code.replace(/text-zinc-500(?!.*dark:)/g, 'text-zinc-500 dark:text-zinc-500'); // No change but prevents dark: matches causing issues

  // Top header block (CustomersList has no 'bg-zinc-900/50' in header, it might have it in others)
  // Let's do bg-zinc-950/90 or similar if it exists
  code = code.replace(/bg-zinc-900\/50(?!.*dark:)/g, 'bg-white/80 dark:bg-zinc-900/50');
  
  // Tables if they exist in other components
  code = code.replace(/divide-white\/5(?!.*dark:)/g, 'divide-zinc-200 dark:divide-white/5');
  code = code.replace(/bg-zinc-950\/95(?!.*dark:)/g, 'bg-zinc-50/95 dark:bg-zinc-950/95');

  fs.writeFileSync(filePath, code);
  console.log(`Updated ${fileName}`);
});
