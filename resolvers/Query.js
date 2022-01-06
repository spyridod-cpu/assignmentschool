const sqlite3  = require('sqlite3').verbose();
let db = new sqlite3.Database("./asdf", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the bank database.');
  });


const resolvers = {
    Query: {
      clients: () =>  {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM CLIENT;", function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });
    },
    
    client: (parent,args,ctx) => {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.get("SELECT * FROM CLIENT WHERE ID=(?);",[args.id], function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });
       
    },

    accounts:()=>  {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM ACCOUNT;", function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });
    },

    account: (parent,args,ctx) => {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.get("SELECT * FROM ACCOUNT WHERE ID=(?);",[args.id], function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });
       
    },


    credits: (parent,args,ctx)=>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM CREDIT;", function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });
    },


    credit:(parent,args,ctx)=>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.get("SELECT * FROM CREDIT WHERE ID=(?);",[args.id], function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });


    }


},

    Client:{
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
            
        }
    },

    Account:{
        client:(parent,args,ctx) =>{
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                db.get("SELECT * FROM CLIENT WHERE ID IN (SELECT CLIENT_ID FROM ACCOUNT WHERE ACCOUNT.ID=(?));",[parent.ID], function(err, rows) {  
                    if(err){
                        reject([]); 
                    }
                    resolve(rows);
                });
            });

        },

        credits:(parent,args,ctx) =>{
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                db.all("SELECT * FROM CREDIT WHERE ID IN (SELECT CREDIT_ID FROM LINKED WHERE ACCOUNT_ID =(?) );",[parent.ID], function(err, rows) {  
                    if(err){
                        reject([]); 
                    }
                    resolve(rows);
                });
            });
    }


  },

  Credit:{
    accounts:(parent,args,ctx) =>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM ACCOUNT WHERE ID IN (SELECT ACCOUNT_ID FROM LINKED WHERE CREDIT_ID= (?) );",[parent.ID], function(err, rows) {  
                if(err){
                    reject([]);     
                }
                resolve(rows);
            });
        });
  }


    }
}
module.exports = {resolvers};