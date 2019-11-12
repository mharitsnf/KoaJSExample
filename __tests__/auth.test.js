const request = require('supertest');
const server = require('../app');

beforeAll(async () => {
    // do something before anything else runs
    console.log('Jest starting!');
});

// close the server after each test
afterAll(() => {
    server.close();
    console.log('server closed!');
});

describe('test auth path responsiveness', () => {
    test('get home route GET /', async () => {
        const response = await request(server).get('/auth');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('from auth!');
    });
});

describe('test login using hardcoded user', () => {
    test('POST /auth/login successful', async () => {
        let response = await request(server).post('/auth/login').send({ username: "user", password: "password" })
        expect(response.body.code).toEqual(200)
    });

    test('POST /auth/login wrong username/password', async () => {
        let response = await request(server).post('/auth/login').send({ username: "user", password: "wrong" })
        expect(response.body.code).toEqual(400)
    });
});