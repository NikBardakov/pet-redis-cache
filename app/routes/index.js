var express = require('express');
var router = express.Router();
var test_data = require('../models/test_data')
var cache = require ('../services/cache')


router.post('/postgresdata', async function(req, res, next) {
  var newRow = await test_data.create({uuid: req.body.uuid})
  res.status(201).send(JSON.stringify(newRow))
}
);

router.get('/postgresdata', async function(req, res, next) {
  const result = await test_data.findAll()
  res.status(200).send(JSON.stringify(result))
}
);

router.get('/postgresdata/:id', async function(req, res, next) {
  const valueInDb = await test_data.findByPk(req.params.id)
  if (valueInDb) {
    res.status(200).send(JSON.stringify(valueInDb))
  } 
  else {
    res.status(404).send("Server can't find id " + req.params.id)    
  }
}
);

router.get('/cacheddata/:id', async function(req, res, next) {
  const valueInCache = await cache.get(req.params.id);
  if (valueInCache) {
    res.status(200).send(valueInCache)
  }
  else
  {
    const valueInDb = await test_data.findByPk(req.params.id)
    if (valueInDb) {
      res.status(200).send(JSON.stringify(valueInDb))
      await cache.set(req.params.id, JSON.stringify(valueInDb))
    } 
    else {
      res.status(404).send("Server can't find id " + req.params.id)    
    } 
  }
  
  
}
);


module.exports = router;
