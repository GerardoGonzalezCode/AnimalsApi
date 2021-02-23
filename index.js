const { randomInt } = require('crypto');
const express = require('express');
const path = require('path');

const app = express();
const data = require('./bd.json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Listening on port 3000'));

app.get('/animals', (_, res) => {
  res.send(data);
});

app.post('/animals', (req, res) => {
  const {name, breed, specie, age, color, owner} = req.body;

  const result = schema.validate({name, breed, specie, age, color, owner});
  if (result.error) return res.status(400).send(result.error.details[0].message);

  const dataB = create(name, breed, specie, age, color);

  res.send(dataB);
});

app.put('/animals/:id', (req, res, next) => {
  const {id} = req.params;
  const {name = '', breed = '', specie = '', age = '', color = '', owner = ''} = req.body;

  const {dataB, err} = update(id, name, breed, specie, age, color, owner);
  if (err) return next();

  res.send(dataB);
});

app.delete('/animals/:id', (req, res) => {
  const {id} = req.params;

  const dataB = deleteData(id);

  res.send(dataB);
});

app.get('/users', (_, res) => {
    res.send(data);
  });
  
app.post('/users', (req, res) => {
    const {id, name, breed, specie, age, color, owner} = req.body;

    const result = schema.validate({id, name, breed, specie, age, color, owner});
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const dataB = create(id, name, breed, specie, age, color);

    res.send(dataB);
 });
  
app.put('/users/:id', (req, res, next) => {
    const {id} = req.params;
    const {name = '', breed = '', specie = '', age = '', color = '', owner = ''} = req.body;

    const {dataB, err} = update(id, name, breed, specie, age, color, owner);
    if (err) return next();

    res.send(dataB);
});
  
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    const dataB = deleteData(id);

    res.send(dataB);
});

function create(name, breed, specie, age, color) {
    id = Math.floor(Math.random() * 100000);
    data.push(id, name, breed, specie, age, color);
  
    return data[data.length-1];
}
  
function deleteData(id) {
    const index = data.findIndex(data => data.id == id);
    const dataB = data.splice(index, index);
    return dataB;
}
  
function update(id, name, breed, specie, age, color, owner) {
    try {
      const dataB = data.find(data => data.id == id);
      data.name = name.length === 0 ? data.name: name;
      data.breed = breed.length === 0 ? data.breed: breed;
      data.specie = specie.length === 0 ? data.specie: specie;
      data.age = age.length === 0 ? data.age: age;
      data.color = color.length === 0 ? data.color: color;
      data.owner = owner.length === 0 ? data.owner: owner;
      return {user, err: null};
    } catch (err) {
      return {err, user: null}
    }
}
  
function get(speciesname) {
    return data.find(data => data.speciesname == speciesname);
}

function get(owner) {
    return data.find(data => data.owner == owner);
}
