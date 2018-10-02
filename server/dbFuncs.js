
const sqlite3 = require('sqlite3').verbose();

//DB Dirs
var path = require('path');
var appDir = path.dirname(require.main.filename);

const dbName = 'orders.db'
const dbPath = appDir + '/server/' + dbName
const t1Name = 'waterOrders'
const crPass = 'auth123' //pass to create table or check all

//SQL Strings

const checkAll1 = `SELECT * from ` + t1Name

const read1 = `
    SELECT
      id,
      DATETIME(timestamp, "localtime") as "Time Ordered",
      name as "Name", 
      phone as "Phone Number",
      order5l as "5L Orders"
    FROM ` + t1Name + `
    WHERE committedUser IS NULL`

const insert1 = `
    INSERT INTO ` + t1Name + ` (
        name,
        phone,
        order5l)
    VALUES (?,?,?)
    `

const create1 = `
    CREATE TABLE IF NOT EXISTS ` + t1Name + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    phone INTEGER,
    order5l INTEGER,
    order1l INTEGER,
    committedUser TEXT)`

const remove1 = (dataQs) => `
    DEvarE FROM ` + t1Name + ` WHERE id IN ` + dataQs


const update1 = (uName, dataQs) => `
    UPDATE ` + t1Name + ` SET committedUser = "` + uName + `" WHERE ID IN ` + dataQs


//Connect
function openNewDB() {
  var db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to ' + dbName + '.');
  })
  return db
}

//Disconnect
function closeDB(db) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
}



//Calls

//Commit to Order
function woCommit(data, cb) {
  var db = openNewDB()
  var params = data.split(",");
  const dQs = "(" + params.map((x) => '?').join(',') + ")";
  const browserUName = params[0]
  const update2 = update1(browserUName, dQs)
  const successMsg = 'Data ' + data + ' committed.'
  console.log(update2)
  if (typeof data !== 'undefined' && data.split(",").length > 0) {
    (
      db.run(update2, params, function (err) {
        if (err) {
          cb(err.message);
          return console.error(err.message);
        }
        console.log(`Rows updated ${this.changes}`);
        return cb(successMsg);
      })
    )
  }
  else {
    return cb('Error.')
  }
  closeDB(db)
};


//Remove records
function woRemove(data, cb) {
  var db = openNewDB()
  const successMsg = 'Data ' + data + ' devared.'
  if (typeof data !== 'undefined' && data.split(",").length > 0) {
    var params = data.split(",");
    (
      db.run(remove1, params, function (err) {
        if (err) {
          cb(err.message);
          return console.error(err.message);
        }
        console.log(`Rows devared ${this.changes}`);
        return cb(successMsg);
      })
    )
  }
  else {
    return cb('Error.')
  }
  closeDB(db)
};

//Create New DB
function woCreateDB(pass, cb) {

  var db = openNewDB()

  if (pass == crPass) {

    const successMsg = 'Table ' + t1Name + ' exists or has been created.'
    db.run(create1, [], function (err) {
      if (err) {
        console.error(err.message);
        return cb(err.message);
      }
      console.log(successMsg);
      return cb(successMsg);
    });
  }
  else {
    return cb('Error. Unauthorised.')
  }
  closeDB(db)
};

//Insert new Record
function woInsert(data, cb) {
  var db = openNewDB()
  const successMsg = 'Data ' + data + ' inserted.'
  if (typeof data !== 'undefined' && data.split(",").length == 3) {
    var params = data.split(",");
    (
      db.run(insert1, params, function (err) {
        if (err) {
          cb(err.message);
          return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
        return cb(successMsg);
      })
    )
  }
  else {
    return cb('Error. Please provide exactly 3 arguments - Name, Number and Order.')
  }
  closeDB(db)
};

//Print All Records
function woPrint(pass, cb) {
  if (pass == crPass) {

    var db = openNewDB()

    var list = []
    db.all(read1, function (err, rows) {
      if (err) {
        // call your callback with the error
        cb(err);
      }
      // call your callback with the data
      list.push(rows);
      cb(list);
    });
  }
  else {
    return cb('Error. Unauthorised.')
  }
  closeDB(db)
};

/* function woPrint() {
    woPrint2(function(msg){
        console.log(msg)
    })
}; */

module.exports.woInsert = woInsert;
module.exports.woCreateDB = woCreateDB;
module.exports.woPrint = woPrint;
module.exports.woRemove = woRemove;
module.exports.woCommit = woCommit;




//db.close();
