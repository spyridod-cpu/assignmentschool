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
           
        },


        createCredit:(parent, {
            ID,
            PIN,
            expiry_date
        },ctx)=> {
            return new Promise((resolve, reject) => {
                db.run('INSERT INTO CREDIT(ID,PIN,expiry_date) VALUES (?,?,?);', [
                    ID,
                    PIN,
                    expiry_date
                 ], (err) => {
                        if(err) {
                            reject(null);
                        }  
                        db.get("SELECT last_insert_rowid() as id", (err, row) => {
                        
                            resolve({
                                ID:row["id"],
                                PIN:PIN,
                                expiry_date:expiry_date
                            });
                        });
                        

                });
               
            });
           
        },



        createLink:(parent, {
            account_id,
            credit_id
        },ctx)=> {
            return new Promise((resolve, reject) => {
                db.run(`INSERT INTO LINKED(ACCOUNT_ID,CREDIT_ID) VALUES (?,?);`, [ account_id,credit_id ], (err) => {
                        if(err) {
                            reject(null);
                        }  
                        db.get("SELECT * FROM Credit WHERE ID = (?);",[credit_id],function (err, rows) {
                            console.log(rows)
                            resolve(rows);
                        });
                        

                });
               
            });
           
        },


        createPhoneForClient:(parent, {
            client_id,
            phone_number
        },ctx)=> {
            return new Promise((resolve, reject) => {
                db.run(`INSERT INTO PHONE_NUMBERS(CLIENT_ID,phone_number) VALUES (?,?);`, [ client_id,phone_number ], (err) => {
                        if(err) {
                            reject(null);
                        }  
                        db.get("SELECT * FROM Client WHERE ID = (?);",[client_id],function (err, rows) {
                            resolve(rows);
                        });
                        

                });
               
            });
           
        },


    


        updateClient:(parent,{
            ID,
            name,
            surname,
            patronym,
            AFM,
            AT,
            city,
            street,
            number,
            TK
        },ctx)=>{
            return new Promise((resolve,reject)=>{
                if (name !=null){
                    db.run('UPDATE CLIENT SET name=(?) WHERE ID = (?);',[name,ID]);
                    }
                if (surname!=null){
                    db.run('UPDATE CLIENT SET surname=(?) WHERE ID= (?)',[surname,ID]);
                }
                if (patronym!=null){
                    db.run('UPDATE CLIENT SET patronym=(?) WHERE ID= (?)',[patronym,ID]);
                }
                if (AFM!=null){
                    db.run('UPDATE CLIENT SET AFM=(?) WHERE ID= (?)',[AFM,ID]);
                }
                if (AT!=null){
                    db.run('UPDATE CLIENT SET AT=(?) WHERE ID= (?)',[AT,ID]);

                }
                if (city!=null){
                    db.run('UPDATE CLIENT SET city=(?) WHERE ID= (?)',[city,ID]);
                }
                if (street!=null){
                    db.run('UPDATE CLIENT SET street=(?) WHERE ID= (?)',[street,ID]);
                }
                if (number!=null){
                    db.run('UPDATE CLIENT SET number=(?) WHERE ID= (?)',[number,ID]);
                }
                if (TK!=null){
                    db.run('UPDATE CLIENT SET TK=(?) WHERE ID= (?)',[TK,ID]);
                }

                db.get("SELECT * FROM CLIENT WHERE ID = (?);",[ID], function(err, rows) {                           
                    if(err){
                        reject(null);
                    }
                    resolve(rows);
                    });
                }
          
            )
        },



        updateAccount:(parent,{
            ID,
            type,
            current_balance
        },ctx)=>{
            return new Promise((resolve,reject)=>{
                if (type !=null){
                    db.run('UPDATE ACCOUNT SET type=(?) WHERE ID = (?);',[type,ID]);
                    }
                if (current_balance!=null){
                    db.run('UPDATE ACCOUNT SET current_balance=(?) WHERE ID= (?)',[current_balance,ID]);
                }
               
                db.get("SELECT * FROM ACCOUNT WHERE ID = (?);",[ID], function(err, rows) {                           
                    if(err){
                        reject(null);
                    }
                    resolve(rows);
                    });
                }
          
            )
        },




        updateeBanking:(parent,{
            ID,
            username,
            password,
            email,
            client_id
        },ctx)=>{
            return new Promise((resolve,reject)=>{
                if (username !=null){
                    db.run('UPDATE E_BANKING SET username=(?) WHERE ID = (?);',[username,ID]);
                    }
                if (password!=null){
                    db.run('UPDATE E_BANKING SET password=(?) WHERE ID= (?)',[password,ID]);
                }
                if (email!=null){
                    db.run('UPDATE E_BANKING SET email=(?) WHERE ID= (?)',[email,ID]);
                }
                if (client_id!=null){
                    db.run('UPDATE E_BANKING SET client_id=(?) WHERE ID= (?)',[client_id,ID]);
                }
               

                db.get("SELECT * FROM E_BANKING WHERE ID = (?);",[ID], function(err, rows) {                           
                    if(err){
                        reject(null);
                    }
                    resolve(rows);
                    });
                }
          
            )
        },




        updateEmployee:(parent,{
            ID,
            name,
            surname,
            phone_number,
            city,
            street,
            number,
            TK,
        },ctx)=>{
            return new Promise((resolve,reject)=>{
                if (name !=null){
                    db.run('UPDATE EMPLOYEE SET name=(?) WHERE ID = (?);',[name,ID]);
                    }
                if (surname!=null){
                    db.run('UPDATE EMPLOYEE SET surname=(?) WHERE ID= (?)',[surname,ID]);
                }
                
                if (phone_number!=null){
                    db.run('UPDATE EMPLOYEE SET AT=(?) WHERE ID= (?)',[phone_number,ID]);

                }
                if (city!=null){
                    db.run('UPDATE EMPLOYEE SET city=(?) WHERE ID= (?)',[city,ID]);
                }
                if (street!=null){
                    db.run('UPDATE EMPLOYEE SET street=(?) WHERE ID= (?)',[street,ID]);
                }
                if (number!=null){
                    db.run('UPDATE EMPLOYEE SET number=(?) WHERE ID= (?)',[number,ID]);
                }
                if (TK!=null){
                    db.run('UPDATE EMPLOYEE SET TK=(?) WHERE ID= (?)',[TK,ID]);
                }

                db.get("SELECT * FROM EMPLOYEE WHERE ID = (?);",[ID], function(err, rows) {                           
                    if(err){
                        reject(null);
                    }
                    resolve(rows);
                    });
                }
          
            )
        },





        updateMovement:(parent,{
            ID,
            type,
            date,
            amount,
        },ctx)=>{
            return new Promise((resolve,reject)=>{
                if (type!=null){
                    db.run('UPDATE MOVEMENT SET type=(?) WHERE ID = (?);',[type,ID]);
                    }
                if (date!=null){
                    db.run('UPDATE MOVEMENT SET date=(?) WHERE ID= (?)',[date,ID]);
                }
                
                if (amount!=null){
                    db.run('UPDATE MOVEMENT SET amount=(?) WHERE ID= (?)',[amount,ID]);

                }
             

                db.get("SELECT * FROM MOVEMENT WHERE ID = (?);",[ID], function(err, rows) {                           
                    if(err){
                        reject(null);
                    }
                    resolve(rows);
                    });
                }
          
            )
        },







        

     



    }







}
module.exports = {resolvers};