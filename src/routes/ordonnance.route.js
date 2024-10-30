const express = require('express');
const { ordonnanceOphtaController } = require('../database/controllers/ordonnance.controller');

const OrdonnanceOphtaRouter = express.Router();

// Route pour créer une nouvelle ordonnance
OrdonnanceOphtaRouter.post('/', ordonnanceOphtaController.createOrdonnance);

// Route pour récupérer toutes les ordonnances globalement
OrdonnanceOphtaRouter.get('/', ordonnanceOphtaController.getAllOrdonnances);

// Route pour récupérer toutes les ordonnances d'un patient spécifique
OrdonnanceOphtaRouter.get('/patient/:patientId', ordonnanceOphtaController.getOrdonnancesByPatient);

// Route pour récupérer une ordonnance par son ID
OrdonnanceOphtaRouter.get('/:id', ordonnanceOphtaController.getOrdonnanceById);

// Route pour mettre à jour une ordonnance par son ID
OrdonnanceOphtaRouter.put('/:id', ordonnanceOphtaController.updateOrdonnance);

// Route pour supprimer une ordonnance par son ID
OrdonnanceOphtaRouter.delete('/:id', ordonnanceOphtaController.deleteOrdonnance);

module.exports = { OrdonnanceOphtaRouter };