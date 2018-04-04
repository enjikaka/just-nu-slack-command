const express = require('express');
const justNu  = require('just-nu');
const WebtaskTools  = require('webtask-tools');

const app = express();

const botName = 'Aftonbladet';
const aftonbladetAppIconURL = 'https://gfx.aftonbladet-cdn.se/assets/gfx/social/abAppIcon.png';

const getJustNus = () => new Promise((resolve, reject) => {
  try {
    justNu(data => resolve(data));
  } catch (error) {
    reject(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const { count, topics } = await getJustNus();
    const headlines = topics.map(topic => {
      const subtitles = topic.subtitles.map(({ subtitle }) => {
        return `\t :arrow_right: ${subtitle}`;
      });

      const attachment = {
        text: `
          *${topic.header}*:\n
          ${subtitles.join('\n')}
        `
      };
    });

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
