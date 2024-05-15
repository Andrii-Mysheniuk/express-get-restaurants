const request = require("supertest");
const app = require('./src/app');

beforeEach(() => {
  sampleRestaurants = [
    {
      name: 'AppleBees',
      location: 'Texas',
      cuisine: 'FastFood'
    },
    {
      name: 'LittleSheep',
      location: 'Dallas',
      cuisine: 'Hotpot'
    },
    {
      name: 'Spice Grill',
      location: 'Houston',
      cuisine: 'Indian'
    }
  ];
});

describe('./restaurants endpoint', () => {
  test("Testing restaurants endpoint", async () => {
    const res = await request(app).get("/restaurants");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(sampleRestaurants)
  })

  test("Testing /restaurants/1 GET", async () => {
    const res = await request(app).get("/restaurants/1");
    expect(res.body).toEqual(sampleRestaurants[0])
  })

  test("Testing restaurants POST", async () => {
    const newRestaurant = { name: "Nandos" };
    const res = await request(app)
      .post("/restaurants")
      .send(newRestaurant);

    expect(res.body).toEqual(expect.arrayContaining(sampleRestaurants, newRestaurant))
  })

  test("Testing restaurants PUT", async () => {
    const replaceRestaurant = { name: "Nandos" };
    const res = await request(app)
      .put("/restaurants/2")
      .send(replaceRestaurant)

    expect(res.body).toEqual(expect.arrayContaining([sampleRestaurants[0], replaceRestaurant, sampleRestaurants[2]]))
  })

  test("Testing restaurants PUT", async () => {
    const replaceRestaurant = { name: "Nandos" };
    const res = await request(app)
      .put("/restaurants/2")
      .send(replaceRestaurant)

    expect(res.body).toEqual(expect.arrayContaining([sampleRestaurants[0], replaceRestaurant, sampleRestaurants[2]]))
  })

  test("Testing restaurants DELETE", async () => {
    const res = await request(app)
      .delete("/restaurants/3")

    expect(res.body).toEqual(expect.arrayContaining([sampleRestaurants[0], sampleRestaurants[1]]))
  })
})
