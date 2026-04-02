fetch('http://localhost:8080/api/inventory/items')
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
