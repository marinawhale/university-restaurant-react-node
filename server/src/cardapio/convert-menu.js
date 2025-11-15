const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('src/cardapio/CAP NOVEMBRO 2025.xlsx');

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = XLSX.utils.sheet_to_json(sheet, { defval: '' }); 

function normalizeKey(str) {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '_');
}
const headers = Object.values(data[0]).map(normalizeKey);

const cardapio = data.slice(1).map(row =>
  { const values = Object.values(row);
    const obj = {};
    headers.forEach((key, i) => {
      obj[key] = values[i];
    });
    return obj;
  });
    
fs.writeFileSync('cardapio.json', JSON.stringify(cardapio, null, 2));

console.log('Cardápio convertido para JSON com chaves normalizadas!');