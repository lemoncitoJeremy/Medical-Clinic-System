const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const dbQueries = require('./config.json');
dotenv.config();
const port = 3000

const grantRoleAccess = (res, results) => {
    for (let i = 0; i < results.length; i++) {
        const res_dict = results[i];
        if (res_dict["role"] === "admin") {
            return res.json({ success: true, message: 'Login successful', role: "admin" });
        } else {
            return res.json({ success: true, message: 'Login successful', role: "user" });
        }
    }
};

class Server {
    constructor(port) {
        this.app = express();
        this.port = port || 3000;
        this.db = null;

        this.configureMiddleware();
        this.initializeDatabase();
        this.handleLogin();
    }

    configureMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    initializeDatabase() {
        this.db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });

        this.db.connect((err) => {
            if (err) {
                console.error('MySQL connection error:', err);
                return;
            }
            console.log('Connected to MySQL');
        });
    }

    handleLogin() {
        this.app.post('/login', (req, res) => {
            const { username, password } = req.body;
            const sql = dbQueries.queries.login;

            this.db.query(sql, [username, password], (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ success: false, message: 'Server error' });
                }

                if (results.length > 0) {
                    grantRoleAccess(res, results);
                } else {
                    res.status(401).json({ success: false, message: 'Invalid credentials' });
                }
            });
            console.log("login succesful!")
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

// Start the server
const server = new Server(port);
server.start();
