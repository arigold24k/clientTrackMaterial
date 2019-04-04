const connection = require('./connection');
const func = require( '../functions/functions');

const orm = {
    findone: function(username, cb) {
        const queryString ="SELECT * FROM testDB.testUserTable Where LCASE(username)='" + username.toLowerCase() + "';";
        console.log('This is the connection query', queryString);
        connection.query(queryString, (err, data) => {
            console.log('this is the findone returning data ', data);
            if(err) cb(err, null);
            cb(null, data);
        })
    },
    addone: function(username, pw, cb) {
        console.log('Add one is being hit and this is the data being passed ' + username +", " + pw);
        this.findone(username, (err, data) => {
            if(!data[0]) {
                const hashPW = func.encryptPW(pw);
                if(hashPW !== 0) {
                    const queryString = `INSERT INTO testDB.testUserTable (username, password) VALUES ('${username}', '${hashPW}');`;
                    console.log('This is Insert query being passed ', queryString);
                    connection.query(queryString, (err, res) => {
                            if(err){
                                console.log('this is the error from the Insert ', err);
                                cb(err, null);
                            }
                            console.log('this is the respond from the database ', res);
                            cb(null, res);
                        });
                }
                    // , (error, hashed) => {
                //     if(hashed) {
                //         console.log('---data is coming back from the call to encryptPW---');
                //         return hashed;
                //     }else{
                //         return error;
                //     }
                //
                // const queryString = `INSET INTO testUserTable (username, password) Values (${username}, ${hashPW})`;
                // console.log('This is Insert query being passed ', queryString);
                // connection.query(queryString, (err, data) => {
                //         if(err) cb(err, null);
                //         cb(null, data);
                //     });
                // })
            }else {
                cb(null, 0);
            }
        })
    }
};
module.exports = orm;