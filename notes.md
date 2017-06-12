# TypeScript Workshop

Install VS Code and Node.js, create folder to contain workshop code

## Stage 1

### Server

Create folder called "server" and open in VS Code

```
npm init
npm install --save express
npm install --save-dev typescript tslint @types/node @types/express
./node_modules/.bin/tslint --init
./node_modules/.bin/tsc --init
```

Add the following rules to tslint.json:
```
        "no-console": false,
        "quotemark": "single",
        "semicolon": "always",
        "trailing-comma": "never"
```

Modify the following in tsconfig.json:
Change target to "ES2015"
Uncomment "sourceMap", "outDir" and set to "./dist", "noUnusedLocals", and "noImplicitReturns"
Uncomment the "Strict Type-Checking Options"

Create npm build scripts

Set up build command in VS Code. Ctrl/cmd+shift+p => "Configure task runner" => "npm", copy "test" as template for "build"

Create src/index.ts

Get express hello world and convert to TypeScript following linter and compiler errors: http://expressjs.com/en/starter/hello-world.html

Show compiled output and talk about it

Create launch.json, add "preLaunchTask": "build" to launch.json

Run code using VS Code debugger

Add static file server that points to client, replacing `/` route:

```
app.use(express.static(resolve(__dirname, '..', '..', 'client', 'dist')));
```

## Client

Create folder called "client" and open in VS Code

```
npm init
npm install --save react react-dom
npm install --save-dev typescript tslint webpack awesome-typescript-loader source-map-loader html-webpack-plugin cpy-cli @types/react @types/react-dom
./node_modules/.bin/tslint --init
./node_modules/.bin/tsc --init
```

Add the following rules to tslint.json:
```
        "no-console": false,
        "quotemark": "single",
        "semicolon": "always",
        "trailing-comma": "never"
```

Uncomment "jsx" and set to "react", "sourceMap", "outDir" and set to "./dist", "noUnusedLocals", and "noImplicitReturns"
Uncomment the "Strict Type-Checking Options"

Create webpack.config.js:

```
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};
```

Create npm build scripts

Set up build command in VS Code. Ctrl/cmd+shift+p => "Configure task runner" => "npm", copy "test" as template for "build"

Create src/style.css and src/index.html with the following content:

```
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <div id="root"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

Create src/index.tsx with hello world code from https://facebook.github.io/react/docs/installation.html#hello-world-with-es6-and-jsx

## Stage 2

Server and minimal client (no generics):

Topics:
- variable types
- interfaces
- classes

In server:

```
npm install --save sqlite3 body-parser
npm install --save-dev @types/sqlite3 @types/body-parser
```

Then, create GET and POST API endpoint at /api/notes to get all notes and

Install REST Client extension to test/develop the API, and create sample:

```
GET http://localhost:3000/api/notes HTTP/1.1

###

POST http://localhost:3000/api/notes HTTP/1.1
content-type: application/json

{
  "title": "Sample Note",
  "value": "This is a sample note"
}
```

Add server endpoints:

```
import { json } from 'body-parser';

...

import * as sqlite3 from 'sqlite3';

...

sqlite3.verbose();
const db = new sqlite3.Database(':memory:');

...

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
```

## Stage 3

Client side:

Topics:
- Generics
- Arrays
- dictionaries
-

## Stage 4

Topics:
- Type Definitions
-
