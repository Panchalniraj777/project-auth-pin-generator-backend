// PARSE .ENV
require('dotenv').config();

const http = require('http');

const express = require('express'); // NODE FRAMEWORK
const bodyParser = require('body-parser'); // TO PARSE POST REQUEST
const cors = require('cors'); // ALLOW CROSS ORIGIN REQUESTS

const port = process.env.PORT || 8000;
const app = express();  
require('./Configs/globals'); // GLOBAL SETTINGS FILES

const server = http.createServer(app);

// ------------------------      GLOBAL MIDDLEWARES -------------------------
app.use(bodyParser.json()); // ALLOW APPLICATION JSON
app.use(bodyParser.urlencoded({ extended: false })); // ALLOW URL ENCODED PARSER
app.use(
    cors({
        exposedHeaders: 'refreshed-access-token',
    })
); // ALLOWED ALL CROSS ORIGIN REQUESTS

// --------------------------    ROUTES    ------------------
const appRoutes = require('./Routes');
appRoutes(app);

// --------------------------    START SERVER    ---------------------
server.listen(port, () => {
    console.log(
        chalk.greenBright(
            `\nServer started on port ${chalk.white.bold(port)} ${chalk.yellow.bold(':)')} \n`
        )
    );
});
