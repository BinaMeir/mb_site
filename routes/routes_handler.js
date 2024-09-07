const fs = require('fs');
const Client = require('../db/models/client_contact.js');
const Picture = require('../db/models/picture.js');
const Recommendation = require('../db/models/recommendation.js');

module.exports = {

    add_client_contact: async function (req, res) {
        console.log("helloooo");
        if(!req.body){
          console.log('No body found')
          return res.status(400).send('No body found');
        }
        console.log('name'+ req.body.name);
        console.log('phoneNumber'+req.body.phoneNumber);
        if (!req.body.name ||!req.body.phoneNumber){
          console.log('no name or phone number')
          return res.status(400).send('no name or phone number');
        }
        //validation!!
        const temp_client = {
            "name" : req.body.name,
            "phoneNumber" : req.body.phoneNumber,
            "email" : req.body.email
        };
        try {
            // Use async/await to check if a client with the same phone number exists
            const existingClient = await Client.findOne({ phoneNumber: temp_client.phoneNumber });
        
            if (existingClient) {
              console.log("Contact already exists");
              // If client exists, return a 400 response indicating the conflict
              return res.status(400).send("Contact already exists");
            }
        
            // Create a new client since no existing one was found
            const newClient = new Client(temp_client);
        
            // Save the new client and await the promise
            const savedClient = await newClient.save()
              .then(() => console.log('Document saved'))
              .catch(err => console.error('Save error:', err));
        
            // Send a success response with the newly created client
            res.status(201).send(savedClient);
          } catch (error) {
            // Handle errors, such as database errors or unexpected exceptions
            console.error("Error adding new client:", error);
            res.status(500).send("Internal server error");
          }
        
    },
    addPicture: async function (req, res) {
      console.log("helloooo");
    
      try {
        if (!req.body) {
          console.log('No body found');
          return res.status(400).json({ error: 'No body found' });
        }
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        console.log('filename: ' + req.body.fileName);
    
        const { fileName, fileId, description, category, status, uploadDate, imageType } = req.body;

        if (!fileName || !fileId || !category || !imageType) {
          console.log('Missing fields');
          return res.status(400).json({ error: 'Missing fields' });
        }
    
        // Perform more detailed validation if necessary
    
        const picture = new Picture({
          fileName,
          fileId,
          description,
          category,
          status,
          uploadDate,
          imageType,
          image: req.file.buffer 
        });
    
        const savedPicture = await picture.save();
        console.log('Picture added successfully');
        res.status(201).json({ message: 'Picture added successfully'});
      } catch (error) {
        console.error("Error adding new picture:", error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
    getImagesByCategory :async function(req, res) {
      try {
        const category = req.params.category;
          // console.log("sending images of category"+category)
          // Find images by category from the database
          const images = await Picture.find({ category: category });
          if (images.length === 0) {
            console.log('No images found');
        } else {
            console.log('Images found:', images);
        }
          // Send the images to the client
          res.json(images);
      } catch (error) {
          // Handle errors
          console.error('Error fetching images:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  },
  addRecommendation: async function (req, res) {
    console.log("helloooo");
  
    try {
      if (!req.body) {
        console.log('No body found');
        return res.status(400).json({ error: 'No body found' });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      console.log('filename: ' + req.body.fileName);
  
      const { fileName, description, uploadDate, imageType } = req.body;

      if (!fileName || !imageType) {
        console.log('Missing fields');
        return res.status(400).json({ error: 'Missing fields' });
      }
  
      // Perform more detailed validation if necessary
  
      const rec = new Recommendation({
        fileName,
        description,
        uploadDate,
        imageType,
        image: req.file.buffer 
      });
  
      const savedRec = await rec.save();
      console.log('Recommendation added successfully');
      res.status(201).json({ message: 'Recommendation added successfully'});
    } catch (error) {
      console.error("Error adding new Recommendation:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  getRec :async function(req, res) {
    try {
        console.log("sending images")
        // Find images by category from the database
        const images = await Recommendation.find({ });
        if (images.length === 0) {
          console.log('No images found');
      } else {
          console.log('Images found:', images);
      }
        // Send the images to the client
        res.json(images);
    } catch (error) {
        // Handle errors
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
},

};