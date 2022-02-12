const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database("./asdf", (err) => {
    if (err) {
      console.error(err.message);
    }
  });

//query type Movement. Used to resolve non primitive field types.
const Movement = {
    //resolver for field of type Account.
    account:(parent,args,ctx) =>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.get("SELECT * FROM ACCOUNT WHERE ID IN (SELECT ACCOUNT_ID FROM MOVEMENT WHERE ID=(?));",[parent.ID], function(err, rows) {  
                if(err){
                    reject([]); 
                }
                //return the data of the account
                resolve(rows);
            });
        });
    }

}
module.exports = {Movement};