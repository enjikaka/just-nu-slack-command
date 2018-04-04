const express = require('express');
const justNu  = require('just-nu');
const WebtaskTools  = require('webtask-tools');

const app = express();

const botName = 'Aftonbladet';
const aftonbladetAppIconURL = 'https://gfx.aftonbladet-cdn.se/assets/gfx/social/abAppIcon.png';

app.post('/', async (req, res) => {
  try {
    const { count, topics } = await justNu();
    const headlines = topics.map(text => ({ text }));

    res.status(200).send({
      'response_type': 'in_channel',
      'text': 'Antal "JUST NU" just nu: ' + count,
      'attachments': [
        {
          'username': botName,
          'icon_url': aftonbladetAppIconURL
        },
        ...headlines
      ]
    });
  } catch (error) {
    res.status(500).end(JSON.stringify(error));
  }
});

module.exports = WebtaskTools.fromExpress(app);
