const express = require("express");
const dbFuncs = require("./dbFuncs.js")

const app = express();

app.set("port", process.env.PORT || 3001);

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Express only serves static assets in production

/* if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} */

app.get("/api/order", (req, res) => {
  const param = req.query.q;

  dbFuncs.woInsert(param, function (msg) {
    res.json(msg);
  });
});

app.get("/api/create", (req, res) => {
  const param = req.query.q;
  dbFuncs.woCreateDB(param, function (msg) {
    res.json(msg);
  });
});

app.get("/api/call", (req, res) => {
  const param = req.query.q;

  dbFuncs.woPrint(param, function (msg) {
    res.json(msg)
  })
});

app.get("/api/commit", (req, res) => {
  const param = req.query.q;

  dbFuncs.woCommit(param, function (msg) {
    res.json(msg)
  })
});



app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
})
