// const express = require('express')
// const app = express()
// const mysql = require('mysql')
// const cors = require("cors")
// const corsOptions = {
//   origin: ("https://localhost:5173"),
// };
// app.use(cors(corsOptions));
// // static files setup
// app.use(express.static('./public'))
// // ejs setup
// app.set("view engine","ejs");
// // mediator
// app.use(function(req,res,next){
//     console.log("i am mediator");
//     next();
// })
// // Create a MySQL connection
// const connection = mysql.createConnection ({
//     host: 'localhost',
//     user: 'coder',
//     password: 'coder',
//     database: 'db1' // Use the name of the database you created
// });
// //routes for different pages 
// app.get('/profile/:username', function (req, res) {
//     res.send(`Hello from ${req.params.username}`)
//   })
//   app.get('/register', function (req, res) {
//     res.render("register");
//   })
//   app.get('/login', function (req, res) {
//     // res.send('Hello from login page')
//      // Fetch users from the database
//   connection.query('SELECT * FROM users', (error, results) => {
//     if (error) {
//         console.error('Error fetching users from the database: ' + error.stack);
//         return res.status(500).json({ error: 'Failed to fetch users' });
//   }

//   // Send the fetched data as a response
//    res.json(results);
// });
//   })
// app.get('/', function (req, res) {
//   res.render("first");
// })

// app.listen(3001)

// const express = require('express');
// const app = express();
// const { Pool } = require('pg');
// const cors = require("cors");

// // CORS setup
// const corsOptions = {
//   origin: "http://localhost:5173",
// };
// app.use(cors(corsOptions));

// // Static files setup
// app.use(express.static('./public'));

// // EJS setup
// app.set("view engine", "ejs");

// // Mediator
// app.use(function(req, res, next){
//     console.log("I am mediator");
//     next();
// });

// // PostgreSQL connection setup
// const pool = new Pool({
//   user: 'postgres',       // Replace with your PostgreSQL username
//   host: 'localhost',
//   database: 'ass1',        // Replace with your PostgreSQL database name
//   password: '#Tanu40048',    // Replace with your PostgreSQL password
//   port: 5432,                      // Default PostgreSQL port
// });

// // Routes
// app.get('/profile/:username', function (req, res) {
//     res.send(`Hello from ${req.params.username}`);
// });

// app.get('/register', function (req, res) {
//     res.send("I am Tanu");
// });

// app.get('/login', async function (req, res) {
//     try {
//         const result = await pool.query('SELECT * FROM users');
//         res.json(result.rows);
//     } catch (error) {
//         console.error('Error fetching users from the database: ' + error.stack);
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// });

// app.get('/', function (req, res) {
//     res.send("I am Tanu");
// });

// // Start the server
// app.listen(3001, () => {
//     console.log('Server is running on http://localhost:3001');
// });


const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require("cors");

// CORS setup
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

// Static files setup
app.use(express.static('./public'));

// EJS setup
app.set("view engine", "ejs");

// Body parser middleware to parse JSON requests
app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
      user: 'postgres',       // Replace with your PostgreSQL username
      host: 'localhost',
      database: 'sample3',        // Replace with your PostgreSQL database name
      password: '#Tanu40048',    // Replace with your PostgreSQL password
      port: 3128,                      // Default PostgreSQL port
    });

    app.get('/login', function (req, res) {
        res.render("login");
     });

//login post
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Query to check if the username exists
        const result = await pool.query('SELECT * FROM Users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = result.rows[0];

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // If login is successful, send success response
        
        res.json({ success: true, message: 'Login successful', user: user });
// res.redirect('/first');
       
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to log in user' });
    }
});
// Route to get users
app.get('/login', async function (req, res) {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
        condsole.log('login successfully');
       
    } catch (error) {
        console.error('Error fetching users from the database: ' + error.stack);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
app.get('/register-user', function (req, res) {
        res.render("register");
     });

//unique id fnction 
// Function to generate a custom ID with a prefix like 'USER_001'
const generateCustomId = async () => {
    try {
        // Fetch the latest ID from the table (if any)
        const result = await pool.query('SELECT user_id FROM Users ORDER BY user_id DESC LIMIT 1');
        let newId;

        if (result.rows.length > 0) {
            // Extract the numeric part of the last ID, e.g., '001' from 'USER_001'
            const lastId = result.rows[0].user_id;
            const lastIdNum = parseInt(lastId.split('_')[1]);

            // Increment and format the new ID
            newId = `USER_${String(lastIdNum + 1).padStart(3, '0')}`;
        } else {
            // If no IDs exist, start with 'USER_001'
            newId = 'USER_001';
        }

        return newId;
    } catch (err) {
        console.error('Error generating custom ID:', err.message);
        throw err;
    }
};

     
// Route to add a new user with a password
// Route to add a new user with a password
app.post('/register-user', async (req, res) => {
    const {  user_id, username, email, password, type } = req.body;
    console.log('Attempting to connect to PostgreSQL and add a new user...');
    try {
        const customId = await generateCustomId(); // Generate the ID here
        console.log(customId, username, email, password, type);
        const result = await pool.query(
            'INSERT INTO Users (user_id, username, email, password,type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [customId, username, email, password, type]
        );
        console.log('User successfully added:', result.rows[0]);
        res.json({ success: true, user: result.rows[0] });
    } catch (error) {
        console.error('Error adding user to the database:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});



app.get('/', function (req, res) {
   res.render("first");
});
// app.get('/', function (req, res) {
//     res.render("index");
//  });

// Start the server
app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
