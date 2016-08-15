const path = require('path');
const express = require('express');

const testserver = express();

const PORT=8080;

testserver.use(express.static(path.resolve(__dirname, 'test')));
testserver.use(express.static(path.resolve(__dirname, 'testdump')));

testserver.listen(PORT, ()=>{
  console.log('Test server running on port ' + PORT);
});
