const pdf = require('html-pdf');
const html = '<h1>Hello, world!</h1>'; // Your HTML content

const options = {
  format: 'A4',
  orientation: 'portrait',
  border: '10mm',
};

pdf.create(html, options).toFile('webpage.pdf', (err, res) => {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
