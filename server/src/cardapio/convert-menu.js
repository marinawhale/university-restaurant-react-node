const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path')

const XLSX_FILE_PATH = path.join(__dirname, 'CARDAPIO CAP DEZEMBRO  2025.xlsx'); 
const FRONTEND_PUBLIC_PATH = path.join(__dirname, '../../../client/public', 'cardapio.json'); 

const workbook = XLSX.readFile(XLSX_FILE_PATH)

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

const cardapio = data.slice(1).map(row => {
    const values = Object.values(row);
    const obj = {};
    headers.forEach((key, i) => {
      obj[key] = values[i];
    });
    return obj;
  });
    
fs.writeFileSync(FRONTEND_PUBLIC_PATH, JSON.stringify(cardapio, null, 2));

console.log('Cardápio convertido para JSON');