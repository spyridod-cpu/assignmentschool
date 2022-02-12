const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database("./asdf", (err) => {
    if (err) {
      console.error(err.message);
    }
  });


//query type Credit. Used to resolve non primitive field types.
const Credit = {
    //resolver for field of type [Account] (array of Account).
    accounts:(parent,args,ctx) =>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM ACCOUNT WHERE ID IN (SELECT ACCOUNT_ID FROM LINKED WHERE CREDIT_ID= (?) );",[parent.ID], function(err, rows) {  
                if(err){
                    reject([]);     
                }
                //return all accounts linked to the credit card.
                resolve(rows);
            });
        });
  }


}
module.exports = {Credit};