const express = require('express');
const app = express();

app.use(express.static('html'));
app.use(express.static('assets'));
app.use(express.static('build'));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}.`);
});
