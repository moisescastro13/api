const express = require('express');
const PatientCtrl = require('../controllers/patientController');

const Router = express.Router();

Router.get('/',PatientCtrl.index) // api.com/product/ Index: Listar todos los productos
      .post('/',PatientCtrl.create)   // api.com/product/ Create: Crear un nuevo producto
      .get('/:patientId',PatientCtrl.find,PatientCtrl.show)    // api.com/product/category/Hogar Show: Muestra un producto en específico
      .put('/:patientId',PatientCtrl.find,PatientCtrl.update)    // api.com/product/name/SamsungGalaxy Update: Actualizar un producto en especifico
      .delete('/:patientId',PatientCtrl.find,PatientCtrl.remove);// api.com/product/name/SamsungGalaxy

module.exports = Router;