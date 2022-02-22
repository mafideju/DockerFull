const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const keys = require('./keys');
const redis = require('redis');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
});

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

pgClient.on('connect', client => {
    client
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch(err => console.error(err));
})

app.get('/', (req, res) => {
    res.send("Na página principal, servidor OK");
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');

    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

app.post('/values', async (req, res) => {
    const index = req.body.index;

    if(parseInt(index) > 40) {
        return res.status(422).send("Index muito alto.... Valor máximo: 40");
    }

    redisClient.hset('values', index, "Nada calculado para o Index");
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(nUmber) values($1)', [index]);

    res.send({ working: true });
});

app.listen(5000 , (err) => console.log("Ouvindo na porta 5000"));