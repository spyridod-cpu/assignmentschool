const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database("./asdf", (err) => {
    if (err) {
      console.error(err.message);
    }
  });


//query type Client. Used to resolve non primitive field types.
const Client = {
    //resolver for field of type [Account] (array of Account).
    accounts:(parent, args,ctx)=>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM ACCOUNT WHERE CLIENT_ID=(?);",[parent.ID], function(err, rows) {  
                if(err){
                    reject([]); 
                }
                resolve(rows);
            });
        });
        
    },
    //resolver for field of type [Phone_numbers] (array of Phone_numbers).
    phone_numbers:(parent, args,ctx)=>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM PHONE_NUMBERS WHERE CLIENT_ID=(?);",[parent.ID], function(err, rows) {  
                if(err){
                    reject([]); 
                }
                resolve(rows);
            });
        });
        
    },
    //resolver for field of type eBanking.
    eBanking:(parent, args,ctx)=>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.get("SELECT * FROM E_BANKING WHERE CLIENT_ID=(?);",[parent.ID], function(err, rows) {  
                if(err){
                    reject([]); 
                }
                //return the eBanking belonging to a client.
                resolve(rows);
            });
        });
        
    }





}
module.exports = {Client};