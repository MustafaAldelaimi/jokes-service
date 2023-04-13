const express = require('express');
const app = express();
const { Joke } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
    // TODO - filter the jokes by tags and content
    const {tags, content} = req.query
    const jokes = await Joke.findAll()
    let filteredJokes = jokes

    if(tags) {filteredJokes = filteredJokes.filter(joke => joke.tags.includes(tags))}
    if(content) {filteredJokes = filteredJokes.filter(joke => joke.joke.includes(content))}
    
    res.status(200).send(filteredJokes)
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
