import express from 'express';
import justNu from 'just-nu';
import WebtaskTools from 'webtask-tools';

const app = express();

app.post('/', (req, res) => {
  res.status(200).send({
    'response_type': 'in_channel',
    'text': 'Todays menu in Oslo :knife_fork_plate:',
    'attachments': [
      {
        'username': 'Swedish Chef',
        'icon_url': 'http://i.imgur.com/6eF2jXL.png',
        'fields': []
      }
    ]
  });
});

export default WebtaskTools.fromExpress(app);