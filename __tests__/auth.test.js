const request = require('supertest');
const server = require('../app');
const redis = require('async-redis').createClient({ host: 'redis' })
let token;

beforeAll(async () => {
    // do something before anything else runs
    console.log('Jest starting!');
});

// close the server after each test
afterAll(() => {
    server.close();
    console.log('server closed!');
});

// describe('test auth path responsiveness', () => {
//     test('get home route GET /', async () => {
//         const response = await request(server).get('/auth');
//         expect(response.status).toEqual(200);
//         expect(response.text).toContain('from auth!');
//     });
// });

describe('Login: API /auth/login', () => {
    test('Successful', async () => {
        let response = await request(server).post('/auth/login').send({ username: "user", password: "password" })
        expect(response.body.code).toEqual(200)
        token = response.body.data.token
    });

    test('Wrong username/password', async () => {
        let response = await request(server).post('/auth/login').send({ username: "user", password: "wrong" })
        expect(response.body.code).toEqual(400)
    });
});

describe('Logout: API /auth/logout', () => {
    test('Invalid token', async () => {
        let response = await request(server).post('/auth/logout').send({ username: "user",  token: 'aaaaaaa' })
        let isExistsOnRedis = await redis.exists('user')
        expect(response.body.code).toEqual(401)
        expect(isExistsOnRedis).toEqual(1)
    })

    test('Successful', async () => {
        let response = await request(server).post('/auth/logout').send({ username: "user",  token: token })
        let isExistsOnRedis = await redis.exists('user')
        expect(response.body.code).toEqual(200)
        expect(isExistsOnRedis).not.toEqual(1)
    })

    test('Used token', async () => {
        let response = await request(server).post('/auth/logout').send({ username: "user",  token: token })
        let isExistsOnRedis = await redis.exists('user')
        expect(response.body.code).toEqual(401)
        expect(isExistsOnRedis).toEqual(0)
    })

    test('Other user`s token', async () => {
        let response = await request(server).post('/auth/logout').send({ username: "penya",  token: token })
        expect(response.body.code).toEqual(401)
    })

})