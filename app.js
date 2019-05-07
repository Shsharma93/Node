const express = require('express');
const app = express();
app.use(express.json());
const Joi = require('@hapi/joi');

const courses = [
  { id: 1, name: 'Distributed Computing' },
  { id: 2, name: 'Java Programming' },
  { id: 3, name: 'Team Project' },
  { id: 4, name: 'Information Security' }
];
app.get('/', (req, res) => {
  res.send('Helloo');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(course => course.id === +req.params.id);
  if (!course) {
    res.status(404).send('The course with given ID was not found');
  }
  res.send(course);
});

///api/posts/:year/:month?sortBy=Name
app.get('/api/posts/:year/:month', (req, res) => {
  const data = [req.query, req.params];
  res.send(data);
});

app.post('/api/courses', (req, res) => {
  const result = validateCourse(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = findCourse(+req.params.id);
  if (!course) return res.status(404).send('Course was not found');

  const result = validateCourse(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = findCourse(+req.params.id);
  if (!course) return res.status(404).send('Course was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

validateCourse = course => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
};

findCourse = course => courses.find(c => c.id === course);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
