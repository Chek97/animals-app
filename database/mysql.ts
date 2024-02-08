import mysql from 'mysql2/promise';

export const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'animals_app'
    });
}


// export const dbConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'animals_app'
// });