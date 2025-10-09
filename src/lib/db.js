import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: '69.62.84.118',
    user: 'learnsrinagar',
    database: 'learnsrinagar',
    password: 'e3iWzvZnZifgN38OiM2Q',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'learnsrinagar',
//     password: '',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

export async function query(sql, params = []) {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, params);
        return [results];
    } finally {
        connection.release();
    }
}