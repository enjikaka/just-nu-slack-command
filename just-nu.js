const express = require('express');
const justNu  = require('just-nu');
const WebtaskTools  = require('webtask-tools');

const app = express();

app.post('/', async (req, res) => {
  try {
    const { count, topics } = await justNu();
    const headlines = topics.map(({ title, url }) => ({ title, title_link: url }));

    res.status(200).send({
      'response_type': 'in_channel',
      'text': 'Antal "JUST NU" just nu: ' + count,
      'attachments': headlines
    });
  } catch (error) {
    res.status(500).end(JSON.stringify(error));
  }
});

module.exports = WebtaskTools.fromExpress(app);
