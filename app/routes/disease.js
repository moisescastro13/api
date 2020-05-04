const express = require('express');
const DiseaseCtrl = require('../controllers/diseaseController');

const Router = express.Router();

Router.get('/',DiseaseCtrl.index) // api.com/product/ Index: Listar todos los productos
      .post('/',DiseaseCtrl.create)   // api.com/product/ Create: Crear un nuevo producto
      .get('/:diseaseId',DiseaseCtrl.find,DiseaseCtrl.show)    // api.com/product/category/Hogar Show: Muestra un producto en específico
      .put('/:diseaseId',DiseaseCtrl.find,DiseaseCtrl.update)    // api.com/product/name/SamsungGalaxy Update: Actualizar un producto en especifico
      .delete('/:diseaseId',DiseaseCtrl.find,DiseaseCtrl.remove);// api.com/product/name/SamsungGalaxy

module.exports = Router;