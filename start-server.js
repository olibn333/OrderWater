const express = require("express");
const dbFuncs = require("./server/dbFuncs.js")

const app = express();

app.set("port", process.env.PORT || 3001);

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


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
})
