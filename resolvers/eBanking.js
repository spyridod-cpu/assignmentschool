const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database("./asdf", (err) => {
    if (err) {
      console.error(err.message);
    }
  });

//query type eBanking. Used to resolve non primitive field types.
const eBanking =  {
    //resolver for field of type Client.
    client:(parent,args,ctx) =>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.get("SELECT * FROM CLIENT WHERE ID IN (SELECT CLIENT_ID FROM E_BANKING WHERE ID=(?));",[parent.ID], function(err, rows) {  
                if(err){
                    reject([]); 
                }
                //return the client
                resolve(rows);
            });
        });
    }


}
module.exports = {eBanking};