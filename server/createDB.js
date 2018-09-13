
const sqlite3 = require('sqlite3').verbose();

//SQL

const dbName = 'orders2.db'
const dbPath = './' + dbName
const t1Name = 'waterOrders'


const create1 = `
    CREATE TABLE IF NOT EXISTS ` + t1Name + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    phone INTEGER,
    order5l INTEGER,
    order1l INTEGER)`


let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to ' + dbName + '.');
});

db.run(create1, [], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('Table ' + t1Name +' Created.');
  });

db.close();
