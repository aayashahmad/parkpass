const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Park = require('./models/Park');

const app = express();

// ✅ 1. MIDDLEWARE FIRST
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // ✅ Serve images before routes

// ✅ 2. DATABASE CONNECTION
const uri = "mongodb+srv://bhatashu877:ayash123@cluster0.3psjioc.mongodb.net/park_booking";
mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch(err => console.log(err));

// ✅ 3. FILE UPLOAD CONFIG
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ✅ 4. ROUTES AFTER MIDDLEWARE
app.post('/parks', upload.single('image'), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const newPark = new Park(data);
    const saved = await newPark.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add park' });
  }
});

app.get('/parks', async (req, res) => {
  const parks = await Park.find();
  res.json(parks);
});

// ✅ 5. START SERVER
app.listen(5000, () => console.log('✅ Backend running on http://localhost:5000'));
