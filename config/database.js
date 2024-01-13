import mysql from 'mysql';

// Configura la connessione al database
const database = mysql.createConnection({
	host: 'localhost',
	port: 3306, // predefinita xampp
	user: 'root',
	password: '',
	database: 'hotelhub',
});

export default database;
