const express = require('express');
const router = express.Router();

const ProjectController = new (require('../Controllers/Project.Controller'))();

router.route('/')
    .post(ProjectController.addProject);

router.route('/')
    .put(ProjectController.updateProjectAuth);

router.route('/generateQr')
    .get(ProjectController.generateQr);

module.exports = router;
