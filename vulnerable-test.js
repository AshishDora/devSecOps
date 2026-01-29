const express = require('express');
const app = express();
const fs = require('fs');
const { exec } = require('child_process');

// 1. Path Traversal / Directory Traversal
app.get('/read', (req, res) => {
  const fileName = req.query.file;
  // VULNERABLE: Direct use of user input in file system calls
  fs.readFile(`./data/${fileName}`, 'utf8', (err, data) => {
    res.send(data);
  });
});

// 2. Command Injection
app.get('/ping', (req, res) => {
  const ip = req.query.ip;
  // VULNERABLE: Concatenating untrusted input into a shell command
  exec(`ping -c 4 ${ip}`, (error, stdout) => {
    res.send(stdout);
  });
});

// 3. Hardcoded Credentials (Security Hotspot)
const dbConfig = {
  host: 'localhost',
  user: 'admin',
  password: 'super_secret_password_123' 
};

// 4. Insecure Redirect
app.get('/redirect', (req, res) => {
  const url = req.query.url;
  // VULNERABLE: Open redirect to any site the user provides
  res.redirect(url);
});

app.listen(3000);
