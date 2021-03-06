const express = require("express");
const app = express();
const routes = require("./routes");
var bodyParser = require('body-parser');
const port = 12345;

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(routes);


app.listen(port, () => {
    console.log("API rodando na porta "+ port );
});