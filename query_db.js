const mysql = require('mysql2/promise');

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'itmind_inventory'
  });

  const [rows] = await connection.execute("SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'itmind_inventory'");
  const tables = {};
  for (const row of rows) {
    const tName = row.table_name || row.TABLE_NAME;
    const cName = row.column_name || row.COLUMN_NAME;
    const dType = row.data_type || row.DATA_TYPE;
    if (!tables[tName]) tables[tName] = [];
    tables[tName].push(`${cName} (${dType})`);
  }
  
  for (const [table, cols] of Object.entries(tables)) {
    console.log(`Table: ${table}`);
    console.log(`  Columns: ${cols.join(', ')}`);
  }
  
  await connection.end();
}

main().catch(console.error);
