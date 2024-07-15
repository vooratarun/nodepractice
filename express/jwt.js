const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000;
const secretKey = 'your_secret_key'; // Replace with a long, random string for production

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory "database" for demo purposes
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'admin' },
  { id: 2, username: 'user2', password: 'password2', role: 'user' }
];

// Route to generate a JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Find user from the "database"
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Route to access a protected resource
app.get('/protected', verifyToken, (req, res) => {
  // If token is valid, respond with protected data
  res.json({ message: 'Protected data accessed successfully', user: req.user });
});

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    
    // Get token from array
    const bearerToken = bearer[1];
    
    // Verify token
    jwt.verify(bearerToken, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token is not valid' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    // Forbidden
    res.status(403).json({ message: 'Unauthorized' });
  }
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
