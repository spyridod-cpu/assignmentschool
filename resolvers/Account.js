const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database("./asdf", (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  //query type Account. Used to resolve non primitive field types.
    const Account = {
        //resolver for field of type Client. 
        client:(parent,args,ctx) =>{
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                db.get("SELECT * FROM CLIENT WHERE ID IN (SELECT CLIENT_ID FROM ACCOUNT WHERE ACCOUNT.ID=(?));",[parent.ID], function(err, rows) {  
                    if(err){
                        reject([]); 
                    }
                    //return the client who owns this account
                    resolve(rows);
                });
            });

        },
        //resolver for field of type Credit
        credits:(parent,args,ctx) =>{
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                db.all("SELECT * FROM CREDIT WHERE ID IN (SELECT CREDIT_ID FROM LINKED WHERE ACCOUNT_ID =(?) );",[parent.ID], function(err, rows) {  
                    if(err){
                        reject([]); 
                    }
                    //return the credit cards linked to this account.
                    resolve(rows);
                });
            });
    },


    //resolver for field of type [Movement] (Array of Movement).
    movements:(parent,args,ctx) =>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM MOVEMENT WHERE ACCOUNT_ID =(?) ;",[parent.ID], function(err, rows) {  
                if(err){
                    reject([]); 
                }
                //return all the movements of funds made this account took part of.
                resolve(rows);
            });
        });


     }


    }
    module.exports = {Account};