const express = require('express');
const path = require("path");
const app = express();
// const server = require("http").createServer(app);





app.use(express.static("splash-react/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,  "splash-react/build", "index.html"));
});
const PORT = process.env.PORT || 3001 ;

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    
    });