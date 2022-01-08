const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db', user: 'root', password: 'root', database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
)`;

connection.query(createTable);

const insertName = async (name) => {
    await connection.query('INSERT INTO people(name) VALUES(?)', [name]);
}

const showHtml = async (res) => {
    await connection.query('select * from people', function (error, results) {
        if (!error) {
            let list = ``;

            results.forEach(item => {
                list += `<li>ID: ${item.id} - Nome: ${item.name}</li>`;
            });

            res.send(`
                <form method="POST" action="/">
                    <input type="text" name="name" required/>
                    <input type="submit"/>
                </form>
                <h1>Full Cycle Rocks!!</h1>
                <ul>
                    ${list}
                </ul>
            `);
        }
    });
}

app.use(express.urlencoded({
    extended: true
}));

app.get('/', async (req, res) => {
    await showHtml(res);
});

app.post('/', async (req, res) => {
    await insertName(req.body.name);
    await showHtml(res);
});

app.listen(port, () => {
    console.log(`Server listening on :${port} ...`)
});
