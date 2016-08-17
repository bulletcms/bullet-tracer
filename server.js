const path = require('path');
const express = require('express');

const app = express();

const PORT=3000;

app.use(express.static(path.resolve(__dirname, 'testdump')));
app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'test/index.html'));
});

app.listen(PORT, ()=>{
  console.log('Test server running on port ' + PORT);
});
