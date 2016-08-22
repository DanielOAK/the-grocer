var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var GroceryItemSchema = new mongoose.Schema({
  name: String,
  price: Number
});

var GroceryItem = mongoose.model('GroceryItem', GroceryItemSchema);

mongoose.connect('mongodb://localhost:27017/myproject');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('app'));

function loadList(res, next) {
  GroceryItem.find(function(err, groceryItems){
    if(err){ return next(err); }

    res.json(groceryItems);
  });
}

app.get('/grocery-items', function(req, res, next) {
  console.log(req);
  console.log("Hello, groceries!");
  loadList(res, next);
});

app.post('/grocery-items', function(req, res, next) {
  console.log(req.body);
  var groceryItem = new GroceryItem(req.body);

  groceryItem.save(function(err, groceryItem){
    if(err){ return next(err); }

    res.json(groceryItem);
  });
});

// update route
app.put('/grocery-items', function (req, res, next) {
  console.log(req.body);

  GroceryItem.findById(req.body._id, function(err, groceryItem) {
    console.log(groceryItem);
    if(err) { return next(err); }

    groceryItem.name = req.body.name;
    groceryItem.save(function(err) {
      if (err) { res.send(err); }
      loadList(res, next);
    })
  });
});


app.delete('/grocery-items', function(req, res, next) {
  console.log(req.body);
  // make a request to the database to delete a particular item
  GroceryItem.find(req.body).remove(function(err, removed) {
    if(err) { return next(err); }
    loadList(res, next);
  });
});

app.get('/hello', function(req, res) {
  res.send('Hey!');
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/app', 'index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
