const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
RoutesHandler = require('./routes_handler');

router.post('/newClient', (req, res) => {
  RoutesHandler.add_client_contact(req, res)
});

router.post('/addPicture', upload.single('image'), RoutesHandler.addPicture);

router.post('/addRecommendation', upload.single('image'), RoutesHandler.addRecommendation);

router.get('/images/:category', RoutesHandler.getImagesByCategory);

router.get('/recommendations', RoutesHandler.getRec);

// Export the router to be used in other parts of the application
module.exports = router;
