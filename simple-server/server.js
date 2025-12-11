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
const USERS_FILE = path.join(DATA_PATH, 'users.json');

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

app.get('/orders', (req, res) => {
  res.json(readOrders());
});

app.post('/orders', (req, res) => {
  const orders = readOrders();
  const newOrder = { ...req.body };
  orders.push(newOrder);
  writeOrders(orders);
  res.status(201).json(newOrder);
});


// usr route 
const readJSON = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

app.get('/users', (req, res) => {
  res.json(readJSON(USERS_FILE));
});

app.post('/users', (req, res) => {
  const users = readJSON(USERS_FILE);
  const newUser = { id: Date.now().toString(), ...req.body }; // auto id

  users.push(newUser);
  writeJSON(USERS_FILE, users);

  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const users = readJSON(USERS_FILE);
  const userId = req.params.id;
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users[index] = { ...users[index], ...req.body };
  writeJSON(USERS_FILE, users);

  res.json(users[index]);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
