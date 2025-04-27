const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// File paths
const ROOMS_FILE = path.join(__dirname, 'rooms.json');
const APPLICATIONS_FILE = path.join(__dirname, 'applications.json');
const USERS_FILE = path.join(__dirname, 'users.json');

// ✅ Serve static files from the "frontend" folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ===========================
// 🧑 USERS (Login/Register)
// ===========================
let users = [];

if (fs.existsSync(USERS_FILE)) {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    users = JSON.parse(data);
  } catch (err) {
    console.error("❌ Failed to load users.json");
    users = [];
  }
}

function saveUsersToFile() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  console.log("✅ users.json updated!");
}

// ===========================
// 🏨 ROOMS SETUP
// ===========================
let rooms = [];

if (fs.existsSync(ROOMS_FILE)) {
  try {
    const data = fs.readFileSync(ROOMS_FILE, 'utf8');
    rooms = JSON.parse(data);
  } catch (err) {
    console.error("❌ Failed to load rooms.json");
    rooms = [];
  }
}

function saveRoomsToFile() {
  fs.writeFileSync(ROOMS_FILE, JSON.stringify(rooms, null, 2));
  console.log("✅ rooms.json updated!");
}

app.get('/rooms', (req, res) => {
  res.json(rooms);
});

app.post('/rooms', (req, res) => {
  const { name, description, capacity, status, image } = req.body;

  if (!name || !description || !capacity || !status || !image) {
    return res.json({ message: 'All fields are required!' });
  }

  rooms.push({ name, description, capacity, status, image });
  saveRoomsToFile();
  res.json({ message: 'Room added successfully!' });
});

app.delete('/rooms/:index', (req, res) => {
  const { index } = req.params;

  if (!rooms[index]) {
    return res.status(404).json({ message: 'Room not found' });
  }

  rooms.splice(index, 1);
  saveRoomsToFile();
  res.json({ message: 'Room deleted successfully!' });
});

// ===========================
// 🧾 APPLICATIONS SETUP
// ===========================
let applications = [];

if (fs.existsSync(APPLICATIONS_FILE)) {
  try {
    const data = fs.readFileSync(APPLICATIONS_FILE, 'utf8');
    applications = JSON.parse(data);
  } catch (err) {
    console.error("❌ Failed to load applications.json");
    applications = [];
  }
}

function saveApplicationsToFile() {
  fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2));
  console.log("✅ applications.json updated!");
}

app.post('/apply', (req, res) => {
  const { name, studentId, gender, hostel, roomType, notes } = req.body;

  if (!name || !studentId || !gender || !hostel || !roomType) {
    return res.json({ message: 'Please fill all required fields.' });
  }

  applications.push({
    name,
    studentId,
    gender,
    hostel,
    roomType,
    notes,
    status: 'Pending'
  });

  saveApplicationsToFile();
  res.json({ message: 'Application submitted successfully!' });
});

app.get('/applications', (req, res) => {
  res.json(applications);
});

app.put('/applications/:index', (req, res) => {
  const { index } = req.params;
  const { status } = req.body;

  if (!applications[index]) {
    return res.status(404).json({ message: 'Application not found' });
  }

  applications[index].status = status;
  saveApplicationsToFile();
  res.json({ message: `Application ${status}` });
});

// ===========================
// 🔐 REGISTER ROUTE
// ===========================
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.json({ message: 'User already exists' });
  }

  users.push({ name, email, password });
  saveUsersToFile();
  console.log("✅ New user registered:", email);
  res.json({ message: 'Registration successful! Please log in.' });
});

// ===========================
// 🔐 LOGIN ROUTE
// ===========================
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.json({ message: 'Invalid email or password' });
  }

  console.log("✅ Login route hit:", email);
  res.json({ message: `Login successful! Welcome ${user.name}` });
});

// ===========================
// 🚀 START SERVER
// ===========================

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
