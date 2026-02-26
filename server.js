const express = require('express')
const {Pool} = require('pg')

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'site_db',
    password: 'tamerlan090805',
    port: 5432
})

pool.connect()
    .then(() => console.log('PostgresSQL succesfully connected'))
    .catch(err => console.error('Error:', err));

app.get('/university/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM universities WHERE id = $1',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Not found');
        }

        res.json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(3000, () => {
    console.log('Server has started')
})