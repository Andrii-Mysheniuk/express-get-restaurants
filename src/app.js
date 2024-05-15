const express = require("express")
const app = express()
const Restaurant = require("../models/index")
const db = require("../db/connection")

//TODO: Create your GET Request Route Below:
app.use(express.json())
app.use(express.urlencoded())

function simplifyRestaurant(restaurant) {
  return {
    name: restaurant.name,
    location: restaurant.location,
    cuisine: restaurant.cuisine
  };
}

app.get('/restaurants', async (req, res) => {
  const restaurants = await Restaurant.findAll()
  const simplifiedRestaurants = restaurants.map(simplifyRestaurant);
  res.json(simplifiedRestaurants);
})

app.post('/restaurants', async (req, res) => {
  const restaurants = await Restaurant.findAll()
  restaurants.push(req.body)
  const simplifiedRestaurants = restaurants.map(simplifyRestaurant);
  res.json(simplifiedRestaurants);
})

app.get('/restaurants/:id', async (req, res) => {
  const restaurants = await Restaurant.findAll()
  const id = req.params.id
  const restaurant = await Restaurant.findByPk(id)

  if (id >= 1 && id <= restaurants.length) {
    const simplifiedRestaurant = simplifyRestaurant(restaurant);
    res.json(simplifiedRestaurant);
  } else {
    res.status(404).json({ message: 'Musician not found' })
  }
})

app.put('/restaurants/:id', async (req, res) => {
  const restaurants = await Restaurant.findAll()
  const id = req.params.id
  restaurants[id - 1] = req.body

  const simplifiedRestaurants = restaurants.map(simplifyRestaurant);
  res.json(simplifiedRestaurants);
})

app.delete('/restaurants/:id', async (req, res) => {
  const restaurants = await Restaurant.findAll()
  const id = req.params.id
  restaurants.splice(id - 1, 1)

  const simplifiedRestaurants = restaurants.map(simplifyRestaurant);
  res.json(simplifiedRestaurants);
})

module.exports = app