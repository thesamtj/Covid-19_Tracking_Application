//Install express server
const express = require("express");
const path = require("path");

const app = express();

// get dist folder
const distDir = path.join(__dirname, "../dist");

// use dist folder as hosting folder by express
app.use(express.static(distDir));

// // Serve only the static files form the dist directory
// app.use(express.static('../dist/corona-tracker'));

// serve the index.html
app.get("*", (req, res) => res.sendFile(path.join(distDir, "index.html")));

// app.get('/*', (req, res)=> {

// res.sendFile(path.join(__dirname,'../dist/corona-tracker/index.html'));
// });

// Start the app by listening on the default Heroku port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is running from port ${port}`);
});
