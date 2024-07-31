var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path'); // Asegúrate de importar path aquí

// Controllers
const GeneroController = require('../controls/GeneroController');
var generoController = new GeneroController();
const PersonaController = require('../controls/PersonaController');
var personaController = new PersonaController();
const LibroController = require('../controls/LibroController');
var libroController = new LibroController();
const CuentaController = require('../controls/CuentaController');
var cuentaController = new CuentaController();

// Multer storage configuration for book covers
const storage_portada_libro = () => multer.diskStorage({
    destination: path.resolve(__dirname, '../public/images/libros/portadas'), // Ajusta la ruta si es necesario
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const extensiones_aceptadas_foto = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error("Error: Archivo no soportado. Solo se permiten imágenes."));
};

const upload_portada_libro = multer({
    storage: storage_portada_libro(),
    fileFilter: extensiones_aceptadas_foto
});

// Routes
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/genero/listar', generoController.listar);
router.post('/genero/guardar', generoController.guardar);

// Rutas de Persona
router.post('/persona/guardar', personaController.guardar);

// Rutas de Libro
router.post('/libro/guardar', upload_portada_libro.single('portada'), libroController.guardar);
router.get('/libro/listar', libroController.listar);
// Cuenta
router.post('/cuenta/sesion', cuentaController.sesion);

module.exports = router;