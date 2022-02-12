//code to connect to sqlite database
const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database("./asdf", (err) => {
    if (err) {
      console.error(err.message);
    }
  });


  /*
  Root query type Query, contains resolvers for all types defined in schema. It runs sqlite queris to fetch the data from the database
  and returns the appropriate data.
  */
    Query = {
        //resolver for clients query. It returns a table containing the data of all clients.
      clients: () =>  {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM CLIENT;", function(err, rows) {  
                if(err){
                    reject([]);
                }
                //returns the table
                resolve(rows);
            });
        });
    },
    //resolver for client query. It returns a row containing the data of a single client with a specific id.
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
    //resolver for accounts query. Returns a table containing the data of all accounts. 

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
    //resolver for account query. Returns a row containing data of a signle account with a specific id.
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

    //resolver for credits query. Returns a table containing data of all credit cards.
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

    //resolver for credit query. Returns a row containing the data of a single credit card with a specific id.
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


    },

        //resolver for eBankings query. Returns a table containing data of all eBanking accounts.
    eBankings:(parent, args,ctx) =>  {
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                db.all("SELECT * FROM E_BANKING;", function(err, rows) {  
                    if(err){
                        reject([]);
                    }
                    resolve(rows);
                });
            });


    },
    //resolver for eBanking query. Returns a row with the data of a eBanking account with a specific id.
    eBanking: (parent,args,ctx) => {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.get("SELECT * FROM E_BANKING WHERE ID=(?);",[args.id], function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });
       
    },
    //resolver for employees query. Returns a table with the data of all employees.
    employees:(parent, args,ctx) =>  {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM EMPLOYEE;", function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });


    },
    //resolver for employee query. Returns a row with the data of a single employee with a specific id.
    employee: (parent,args,ctx) => {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.get("SELECT * FROM EMPLOYEE WHERE ID=(?);",[args.id], function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });
   
    },

    //resolver for movements query. Returns a table with the data of all movements of funds made to all accounts.
    movements:(parent, args,ctx) =>  {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM MOVEMENT;", function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });


    },
    //resolver for movement query. Returns a row with the data of a single movement of funds of an account, based on movement id.
    movement: (parent,args,ctx) => {
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.get("SELECT * FROM MOVEMENT WHERE ID=(?);",[args.id], function(err, rows) {  
                if(err){
                    reject([]);
                }
                resolve(rows);
            });
        });

    },

   



}

    



module.exports = {Query};