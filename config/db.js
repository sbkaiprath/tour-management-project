const mysql = require('mysql')


const connectDb = async() => {
    const conn = await mysql.createConnection({
        host: 'localhost',
        database: 'TOURISMMANAGE',
        user: 'root',
        password: 'password'
    });

    conn.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log(`Database connection successful`);
    });



}

module.exports = connectDb;