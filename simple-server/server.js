const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const DATA_PATH = path.join(__dirname, 'data');
const MENU_FILE = path.join(DATA_PATH, 'menu.json');
const ORDERS_FILE = path.join(DATA_PATH, 'ordersHistory.json');

app.get('/', (req, res) => {
  res.send('Hello! Welcome to KFC server.');
});

// --- MENU (Read-only)
app.get('/menu', (req, res) => {
  const menuData = fs.readFileSync(MENU_FILE, 'utf8');
  res.json(JSON.parse(menuData));
});

// --- ORDERS (Writable)
const readOrders = () => {
  if (!fs.existsSync(ORDERS_FILE)) return [];
  const data = fs.readFileSync(ORDERS_FILE, 'utf8');
  return JSON.parse(data);
  
};

const writeOrders = (orders) => {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
};

// GET all orders
app.get('/orders', (req, res) => {
  res.json(readOrders());
});

// POST new order
app.post('/orders', (req, res) => {
  const orders = readOrders();
  const newOrder = { ...req.body };
  orders.push(newOrder);
  writeOrders(orders);
  res.status(201).json(newOrder);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
