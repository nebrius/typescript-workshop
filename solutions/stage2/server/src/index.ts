import { json } from 'body-parser';
import * as express from 'express';
import { resolve } from 'path';
import * as sqlite3 from 'sqlite3';

const TABLE_NAME = 'notes';

const app = express();

sqlite3.verbose();
const db = new sqlite3.Database(':memory:');

app.use(express.static(resolve(__dirname, '..', '..', 'client', 'dist')));
app.use(json());

app.get('/api/notes', (req, res) => {
  db.all(`SELECT * FROM ${TABLE_NAME}`, (err, rows) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(rows);
  });
});

app.post('/api/notes', (req, res) => {
  db.run(`INSERT INTO ${TABLE_NAME} (title, value) VALUES ("${req.body.title}", "${req.body.value}")`);
});

db.run(`CREATE TABLE ${TABLE_NAME} (title TEXT NOT NULL, value TEXT NOT NULL)`, (err) => {
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
});
