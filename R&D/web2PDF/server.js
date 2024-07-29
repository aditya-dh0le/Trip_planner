const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/generate-pdf', async (req, res) => {
    const { content, mapUrl } = req.body;

    // Launch Puppeteer to capture a screenshot of the HTML content
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content);
    const screenshotBuffer = await page.screenshot();
    await browser.close();

    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename=page.pdf',
        }).end(pdfData);
    });

    doc.font('Times-Roman')
       .fontSize(12)
       .text('Webpage Screenshot', 100, 100);

    // Add the image captured from Puppeteer
    doc.image(screenshotBuffer, {
        fit: [500, 300],
        align: 'center',
        valign: 'center'
    });

    doc.addPage();
    const source = 'Nashik';
    const destination = 'Goa';
    const waypoints = ['Mumbai']; // Array of intermediate waypoints

    // Construct the waypoints string for Google Maps
    const waypointsString = waypoints.map(place => `via:${place}`).join('|');

    const googleMapUrl = `https://www.google.com/maps/dir/${source}/${waypointsString}/${destination}`;
    doc.fontSize(16).text('Google Map', { link: googleMapUrl, underline: true });

    doc.end();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
