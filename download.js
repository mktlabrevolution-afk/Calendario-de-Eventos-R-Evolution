const https = require('https');
https.get('https://docs.google.com/spreadsheets/d/1L0LEQrBOaXgWUGBAD73Qk4huDQVruCkf/export?format=csv&gid=1361238992', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => { console.log(data); });
}).on('error', (err) => {
  console.error(err);
});
