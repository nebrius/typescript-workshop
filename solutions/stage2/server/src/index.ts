import { json } from 'body-parser';
import { IGetMemesPayload, IMeme } from 'common';
import * as express from 'express';
import { resolve } from 'path';
import * as sqlite3 from 'sqlite3';

const TABLE_NAME = 'notes';

const app = express();

sqlite3.verbose();
const db = new sqlite3.Database(':memory:');

app.use(express.static(resolve(__dirname, '..', '..', 'client', 'dist')));
app.use(json());

app.get('/api/memes', (req, res) => {
  db.all(`SELECT * FROM ${TABLE_NAME}`, (err, memes) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const payload: IGetMemesPayload = { memes };
    res.send(payload);
  });
});

app.post('/api/memes', (req, res) => {
  const payload: IMeme = req.body;
  db.run(`INSERT INTO ${TABLE_NAME} (name, url) VALUES ("${payload.name}", "${payload.url}")`, (err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send('ok');
  });
});

db.run(`CREATE TABLE ${TABLE_NAME} (name TEXT NOT NULL, url TEXT NOT NULL)`, (err) => {
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
});
