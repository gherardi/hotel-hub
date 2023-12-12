import mysql from 'mysql';

// Configura la connessione al database
const database = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'hotel-hub',
});

export default database;
