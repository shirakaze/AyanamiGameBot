const db = require('../databaseconfig')

const userDB = {
    //change the data you wish to insert below, leave callback alone
    getData: (callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "SELECT * FROM users"
            conn.query(sql, (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    addUser: (discordID, coins, gems, lastDaily, dailyStreak, torpedoStock, currentShip, health, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            console.log("Connected! - addUser")
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "INSERT INTO users(discordID,coins,gems,lastDaily,dailyStreak,torpedoStock,currentShip,health) VALUES(?,?,?,?,?,?,?,?)"
            conn.query(sql, [discordID , coins, gems, lastDaily, dailyStreak, torpedoStock, currentShip, health], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    addCoins: (discordID, coins, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "UPDATE users SET coins = ? WHERE discordID = ?"
            conn.query(sql, [coins , discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    addGems: (discordID, gems, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "UPDATE users SET gems = ? WHERE discordID = ?"
            conn.query(sql, [gems , discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    addlastDaily: (discordID, lastDaily, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "UPDATE users SET lastDaily = ? WHERE discordID = ?"
            conn.query(sql, [lastDaily , discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    adddailyStreak: (discordID, dailyStreak, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "UPDATE users SET dailyStreak = ? WHERE discordID = ?"
            conn.query(sql, [dailyStreak , discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    addtorpedoStock: (discordID, torpedoStock, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "UPDATE users SET torpedoStock = ? WHERE discordID = ?"
            conn.query(sql, [torpedoStock , discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    addcurrentShip: (discordID, currentShip, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "UPDATE users SET currentShip = ? WHERE discordID = ?"
            conn.query(sql, [torpedoStock , discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    addhealth: (discordID, health, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "UPDATE users SET health = ? WHERE discordID = ?"
            conn.query(sql, [torpedoStock , discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    getcoins: (discordID, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "SELECT users.coins FROM users WHERE discordID = ?"
            conn.query(sql, [discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    getgems: (discordID, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "SELECT users.gems FROM users WHERE discordID = ?"
            conn.query(sql, [discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    getlastDaily: (discordID, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "SELECT users.lastDaily FROM users WHERE discordID = ?"
            conn.query(sql, [discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    getdailyStreak: (discordID, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "SELECT users.dailyStreak FROM users WHERE discordID = ?"
            conn.query(sql, [discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    gettorpedoStock: (discordID, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "SELECT users.torpedoStock FROM users WHERE discordID = ?"
            conn.query(sql, [discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    getcurrentShip: (discordID, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "SELECT users.currentShip FROM users WHERE discordID = ?"
            conn.query(sql, [discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
    gethealth: (discordID, callback) => { 
        const conn = db.getConnection()
        conn.connect((err) => {
            if (err) { console.log(err); return callback(err, null) }
            
            //put data to insert under user(), put 1 "?" for each data in VALUES()
            const sql = "SELECT users.health FROM users WHERE discordID = ?"
            conn.query(sql, [discordID], (err, result) => {
                return err ? callback(err, null) : callback(null, result)
            })
        })
    },
}
module.exports = userDB