const server = require('./api/server');
const supertest = require('supertest');
const db = require('./database/dbConfig');


beforeEach(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy()
})

test('register user', async() => {
    const res = await supertest(server).post('/api/auth/register').send({username: "Dip", password: 'Beans'})

    expect(res.statusCode).toBe(409);
    expect(res.type).toBe('application/json')
    
})

test('login user', async() => {
    const res = await supertest(server).post('/api/auth/login').send({username: "Dip", password: 'Beans'})

    expect(res.statusCode).toBe(401);
})

test('get jokes', async() => {
    const res = await supertest(server).get('/api/jokes')
    // console.log(res)

    expect(res.unauthorized).toBe(false)
    expect(res.body).toHaveLength(20)
})