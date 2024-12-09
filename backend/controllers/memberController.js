// controllers/memberController.js
const db = require('../config/database');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `member-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Solo imágenes!');
    }
  }
}).single('photo');

exports.createMember = (req, res) => {
  upload(req, res, function(err) {
    if (err) {
      console.error('Error en upload:', err);
      return res.status(400).json({ error: err.message });
    }

    console.log('Datos recibidos:', req.body);
    console.log('Archivo recibido:', req.file);

    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const query = 'INSERT INTO members (name, photo_url) VALUES (?, ?)';
    db.query(query, [name, photoUrl], (err, results) => {
      if (err) {
        console.error('Error en la base de datos:', err);
        return res.status(500).json({ error: err.message });
      }

      console.log('Miembro creado:', results);
      res.status(201).json({
        id: results.insertId,
        name,
        photo_url: photoUrl,
        created_at: new Date()
      });
    });
  });
};