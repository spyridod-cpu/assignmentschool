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


    },


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
            
        },

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

        eBanking:(parent, args,ctx)=>{
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                db.get("SELECT * FROM E_BANKING WHERE CLIENT_ID=(?);",[parent.ID], function(err, rows) {  
                    if(err){
                        reject([]); 
                    }
                    resolve(rows);
                });
            });
            
        },
    

    


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
    },



    movements:(parent,args,ctx) =>{
        return new Promise((resolve, reject) => {
            // raw SQLite query to select from table
            db.all("SELECT * FROM MOVEMENT WHERE ACCOUNT_ID =(?) ;",[parent.ID], function(err, rows) {  
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


    },

    eBanking: {
        client:(parent,args,ctx) =>{
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                db.get("SELECT * FROM CLIENT WHERE ID IN (SELECT CLIENT_ID FROM E_BANKING WHERE ID=(?));",[parent.ID], function(err, rows) {  
                    if(err){
                        reject([]); 
                    }
                    resolve(rows);
                });
            });
        }


    },
    

    Movement: {
        account:(parent,args,ctx) =>{
            return new Promise((resolve, reject) => {
                // raw SQLite query to select from table
                db.get("SELECT * FROM ACCOUNT WHERE ID IN (SELECT ACCOUNT_ID FROM MOVEMENT WHERE ID=(?));",[parent.ID], function(err, rows) {  
                    if(err){
                        reject([]); 
                    }
                    resolve(rows);
                });
            });
        }

    },

    Mutation: {
        createClient:(parent, {
            ID,
            name,
            surname,
            patronym,
            AFM,
            AT,
            city,
            street,
            number,
            TK,
        },ctx)=> {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO CLIENT (ID,name,surname,patronym,AFM,AT,city,street,number,TK) VALUES (?,?,?,?,?,?,?,?,?,?);', [ ID,
                    name,
                    surname,
                    patronym,
                    AFM,
                    AT,
                    city,
                    street,
                    number,
                    TK ], (err) => {
                        if(err) {
                            reject(null);
                        }  
                        db.get("SELECT last_insert_rowid() as id", (err, row) => {
                        
                            resolve({
                                ID:row["id"],   
                                name:name,
                                surname:surname,
                                patronym:patronym,
                                AFM:AFM,
                                AT:AT,
                                city:city,
                                street:street,
                                number:number,
                                TK:TK,
                            });
                        });
                        

                });
               
            });
           
        },

        createEmployee:(parent, {
            ID,
            name,
            surname,
            phone_number,
            city,
            street,
            number,
            TK
        },ctx)=> {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO Employee (ID,name,surname,phone_number,city,street,number,TK) VALUES (?,?,?,?,?,?,?,?);', [ ID,
                    name,
                    surname,
                    phone_number,
                    city,
                    street,
                    number,
                    TK ], (err) => {
                        if(err) {
                            reject(null);
                        }  
                        db.get("SELECT last_insert_rowid() as id", (err, row) => {
                        
                            resolve({
                                ID:row["id"],   
                                name:name,
                                surname:surname,
                                phone_number:phone_number,
                                city:city,
                                street:street,
                                number:number,
                                TK:TK,
                            });
                        });
                        

                });
               
            });
           
        },
        
        createeBanking:(parent, {
            ID,
            username,
            password,
            email,
            client_id
        },ctx)=> {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO E_BANKING (ID,username,password,email,client_id) VALUES (?,?,?,?,?);', [
                    ID,
                    username,
                    password,
                    email,
                    client_id
                 ], (err) => {
                        if(err) {
                            reject(null);
                        }  
                        db.get("SELECT last_insert_rowid() as id", (err, row) => {
                        
                            resolve({
                                ID:row["id"],
                                username:username,
                                password:password,
                                email:email,
                                client_id:client_id
                            });
                        });
                        

                });
               
            });
           
        },

        createAccount:(parent, {
            ID,
            type,
            current_balance,
            client_id
        },ctx)=> {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO ACCOUNT (ID,type,current_balance,CLIENT_ID) VALUES (?,?,?,?);', [
                    ID,
                    type,
                    current_balance,
                    client_id
                 ], (err) => {
                        if(err) {
                            reject(null);
                        }  
                        db.get("SELECT last_insert_rowid() as id", (err, row) => {
                        
                            resolve({
                                ID:row["id"],
                                type:type,
                                current_balance:current_balance,
                                client_id:client_id
                            });
                        });
                        

                });
               
            });
           
        },



        createMovement:(parent, {
            ID,
            type,
            date,
            amount,
            account_id
        },ctx)=> {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO MOVEMENT (ID,type,date,amount,ACCOUNT_id) VALUES (?,?,?,?,?);', [
                    ID,
                    type,
                    date,
                    amount,
                    account_id
                 ], (err) => {
                        if(err) {
                            reject(null);
                        }  
                        db.get("SELECT last_insert_rowid() as id", (err, row) => {
                        
                            resolve({
                                ID:row["id"],
                                type:type,
                                date:date,
                                amount:amount,
                                account_id:account_id
                            });
                        });
                        

                });
               
            });
           
        }
        






    }
}
module.exports = {resolvers};