const {join} = require("path");
const express = require("express")
const app = express();

const staticPath = join(__dirname, 'build');
console.log(`Setting Static Path to : ${staticPath}`);
app.use(express.static(staticPath));

console.log('All routes serving index.html');

app.get('/*', function(req, res) {
  res.sendFile(join(staticPath, 'index.html'));
});

console.log("Starting to create HTTP Server");

app.listen(8100, () => console.log('Server Started Succesfully on port 8100'));
