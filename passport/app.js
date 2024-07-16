// app.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Sample users database
const users = [];

// Passport Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;
    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  const user = users.find(u => u.username === username);
  done(null, user);
});

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Home</h1><a href="/login">Login</a><br><a href="/register">Register</a>');
});

app.get('/login', (req, res) => {
  res.send('<h1>Login</h1><form method="post" action="/login"><input type="text" name="username" placeholder="Username"/><input type="password" name="password" placeholder="Password"/><button type="submit">Login</button></form>');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

app.get('/register', (req, res) => {
  res.send('<h1>Register</h1><form method="post" action="/register"><input type="text" name="username" placeholder="Username"/><input type="password" name="password" placeholder="Password"/><button type="submit">Register</button></form>');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });
  res.redirect('/login');
});

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('<h1>Dashboard</h1><p>Welcome!</p><a href="/logout">Logout</a>');
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
