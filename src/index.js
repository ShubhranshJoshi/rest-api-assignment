const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
const users = []

// Middleware to parse JSON bodies
app.use(express.json());

// **
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Enter name and email' });
  }
  const newUser = {
    id: uuidv4(),
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Enter Valid User ID' });
  }
  res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'Enter Valid User ID' });
  }
  if (!name || !email) {
    return res.status(400).json({ error: 'Enter Valid name and Email' });
  }
  user.name = name;
  user.email = email;
  res.status(200).json(user);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Enter Valid User ID' });
  }
  users.splice(index, 1);
  res.status(204).send();
});

// Do not touch the code below this comment// **

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing