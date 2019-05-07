const express = require('express');
const app = express();

const courses = [
  { code: 'CSSE4004', name: 'Distributed Computing' },
  { code: 'CSSE2002', name: 'Java Programming' },
  { code: 'ENGG2800', name: 'Team Project' },
  { code: 'COMS3000', name: 'Information Security' }
];
app.get('/', (req, res) => {
  res.send('Helloo');
});

app.get('/courses', (req, res) => {
  res.send(courses);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
