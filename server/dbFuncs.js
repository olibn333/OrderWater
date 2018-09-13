
const sqlite3 = require('sqlite3').verbose();


//DB Dirs
var path = require('path');
var appDir = path.dirname(require.main.filename);

const dbName = 'orders2.db'
const dbPath = appDir + '/db/' + dbName
const t1Name = 'waterOrders'
const crPass = 'auth123' //pass to create table or check all

//SQL Strings
const check1 = 'select *, DATETIME(timestamp, "localtime") as dt1 from ' + t1Name

const insert1 = `
    INSERT INTO ` + t1Name + ` (
        name,
        phone)
    VALUES (?,?)
    `

const create1 = `
    CREATE TABLE IF NOT EXISTS ` + t1Name + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT,
    phone INTEGER,
    order5l INTEGER,
    order1l INTEGER)`

//Connect
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to ' + dbName + '.');
});

//Functions
function woCreateDB(pass, cb) {

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
};

function woInsert(data, cb) {
    const successMsg = 'Data ' + data + ' inserted.'
    if (typeof data !== 'undefined' && data.split(",").length == 2) {
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
        return cb('Error. Please provide exactly 2 arguments - Name and Number.')
    }
};


function woPrint(pass, cb) {
    if (pass == crPass) {

        var list = []
        db.all(check1, function (err, rows) {
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
};

/* function woPrint() {
    woPrint2(function(msg){
        console.log(msg)
    })
}; */

module.exports.woInsert = woInsert;
module.exports.woCreateDB = woCreateDB;
module.exports.woPrint = woPrint;


//db.close();
