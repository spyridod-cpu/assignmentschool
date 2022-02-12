
const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database("./asdf", (err) => {
    if (err) {
      console.error(err.message);
    }
  });

//root query type Mutation. Used to update create new data. 
const Mutation =  {
    //resolver for createClient mutation. Used to insert a new client in the database. Returns a row containing the data of the client created.
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
        //raw sqlite query to insert into table.
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
                        //find last inserted client, the one this resolver creates, and return their data.
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
    //resolver for createEmployee mutation. Used to insert a new employee in the database. Returns a row containing the data of the employee created.
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
                    //id of created employee
                    db.get("SELECT last_insert_rowid() as id", (err, row) => {
                        //return their data
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
    /*resolver for createeBanking mutation. Used to insert a new eBanking account in the database. Returns a row containing the data of the eBanking account
     created*/
    createeBanking:(parent, {
        ID,
        username,
        password,
        email,
        client_id
    },ctx)=> {
        //raw sqlite query
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
                    //created eBanking account id 
                    db.get("SELECT last_insert_rowid() as id", (err, row) => {
                    //return eBanking account
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
    //resolver for createAccount mutation. Used to insert a new Account in the database. Returns a row containing the data of the Account created.
    createAccount:(parent, {
        ID,
        type,
        current_balance,
        client_id
    },ctx)=> {
        //raw sqlite query
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
                    //id of the created account
                    db.get("SELECT last_insert_rowid() as id", (err, row) => {
                    //return its data
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


    //resolver for createMovement mutation. Used to insert a new Movement of funds in the database. Returns a row containing the data of the Movement of funds created.
    createMovement:(parent, {
        ID,
        type,
        date,
        amount,
        account_id
    },ctx)=> {
        return new Promise((resolve, reject) => {
            //raw sqlite query
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
                    //created Movement id
                    db.get("SELECT last_insert_rowid() as id", (err, row) => {
                    //return its data
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

    //resolver for createCredit mutation. Used to insert a new credit card in the database. Returns a row containing the data of the credit card created.
    createCredit:(parent, {
        ID,
        PIN,
        expiry_date
    },ctx)=> {
        return new Promise((resolve, reject) => {
            //raw sqlite query
            db.run('INSERT INTO CREDIT(ID,PIN,expiry_date) VALUES (?,?,?);', [
                ID,
                PIN,
                expiry_date
             ], (err) => {
                    if(err) {
                        reject(null);
                    }  
                    //id of created credit card
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


    /*resolver for createLink mutation. Used to insert a new link of an Account to a credit card in the database.
     Returns a row containing the data of the Link created.*/
    createLink:(parent, {
        account_id,
        credit_id
    },ctx)=> {
        return new Promise((resolve, reject) => {
            //raw sqlite query.
            db.run(`INSERT INTO LINKED(ACCOUNT_ID,CREDIT_ID) VALUES (?,?);`, [ account_id,credit_id ], (err) => {
                    if(err) {
                        reject(null);
                    }  
                    //get data from Credit table
                    db.get("SELECT * FROM Credit WHERE ID = (?);",[credit_id],function (err, rows) {
                        console.log(rows)
                        resolve(rows);
                    });
                    

            });
           
        });
       
    },

    /*resolver for createPhoneForClient mutation. Used to insert a new phone of a client in the database.
     Returns a row containing the data of the client possessing the phone.*/
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




    //resolver for updateClient mutation. Used to update the data of a client. Returns the altered data of the client.
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
            //number of arguments is variable. if statements to change if a field is given.
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
            //return the altered data of the client.

            db.get("SELECT * FROM CLIENT WHERE ID = (?);",[ID], function(err, rows) {                           
                if(err){
                    reject(null);
                }
                resolve(rows);
                });
            }
      
        )
    },


        //resolver for updateAccount mutation. Used to update the data of an Account. Returns the altered data of the Account.
    updateAccount:(parent,{
        ID,
        type,
        current_balance
    },ctx)=>{
        return new Promise((resolve,reject)=>{
            //number of arguments is variable. if statements to change if a field is given.
            if (type !=null){
                db.run('UPDATE ACCOUNT SET type=(?) WHERE ID = (?);',[type,ID]);
                }
            if (current_balance!=null){
                db.run('UPDATE ACCOUNT SET current_balance=(?) WHERE ID= (?)',[current_balance,ID]);
            }
           //return the altere data of the account
            db.get("SELECT * FROM ACCOUNT WHERE ID = (?);",[ID], function(err, rows) {                           
                if(err){
                    reject(null);
                }
                resolve(rows);
                });
            }
      
        )
    },



    //resolver for updateeBanking mutation. Used to update the data of an eBanking account. Returns the altered data of the eBanking account.
    updateeBanking:(parent,{
        ID,
        username,
        password,
        email,
        client_id
    },ctx)=>{
        return new Promise((resolve,reject)=>{
            //number of arguments is variable. if statements to change if a field is given.
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
           
            //return the altere data of the eBanking account
            db.get("SELECT * FROM E_BANKING WHERE ID = (?);",[ID], function(err, rows) {                           
                if(err){
                    reject(null);
                }
                resolve(rows);
                });
            }
      
        )
    },



    //resolver for updateEpmloyee mutation. Used to update the data of an Employee. Returns the altered data of the Employee.
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
            //number of arguments is variable. if statements to change if a field is given.
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
            //return the altere data of the employee
            db.get("SELECT * FROM EMPLOYEE WHERE ID = (?);",[ID], function(err, rows) {                           
                if(err){
                    reject(null);
                }
                resolve(rows);
                });
            }
      
        )
    },




    //resolver for updateMovement mutation. Used to update the data of a Movement. Returns the altered data of the Movement.
    updateMovement:(parent,{
        ID,
        type,
        date,
        amount,
    },ctx)=>{
        return new Promise((resolve,reject)=>{
            //number of arguments is variable. if statements to change if a field is given.
            if (type!=null){
                db.run('UPDATE MOVEMENT SET type=(?) WHERE ID = (?);',[type,ID]);
                }
            if (date!=null){
                db.run('UPDATE MOVEMENT SET date=(?) WHERE ID= (?)',[date,ID]);
            }
            
            if (amount!=null){
                db.run('UPDATE MOVEMENT SET amount=(?) WHERE ID= (?)',[amount,ID]);

            }
         
            //return the altere data of the Movement
            db.get("SELECT * FROM MOVEMENT WHERE ID = (?);",[ID], function(err, rows) {                           
                if(err){
                    reject(null);
                }
                resolve(rows);
                });
            }
      
        )
    },





    //resolver for updateCredit mutation. Used to update the data of an Credit Card. Returns the altered data of the Credit Card .
    updateCredit:(parent,{
        ID,
        PIN,
        expiry_date
    },ctx)=>{
        return new Promise((resolve,reject)=>{
            //number of arguments is variable. if statements to change if a field is given.
            if (PIN!=null){
                db.run('UPDATE CREDIT SET PIN=(?) WHERE ID = (?);',[PIN,ID]);
                }
            if (expiry_date!=null){
                db.run('UPDATE CREDIT SET expiry_date=(?) WHERE ID= (?)',[expiry_date,ID]);
            }
         
            //return the altere data of the credit card.
            db.get("SELECT * FROM CREDIT WHERE ID = (?);",[ID], function(err, rows) {                           
                if(err){
                    reject(null);
                }
                resolve(rows);
                });
            }
      
        )
    }
}
    module.exports = {Mutation};