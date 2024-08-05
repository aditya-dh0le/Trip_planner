import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Button from 'react-bootstrap/Button';
 
const Pdf = () => {
  const handleSaveAsPdf = () => {
    const element = document.body;
 
    // Optional settings
    const opt = {
      margin: 0,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 2 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
 
    // Use html2canvas to capture the DOM element
    html2canvas(element, {
      scale: opt.html2canvas.scale
    }).then(function(canvas) {
      const imgData = canvas.toDataURL('image/jpeg', opt.image.quality);
      const pdf = new jsPDF(opt.jsPDF);
 
      // Calculate dimensions for the image in the PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 2 * opt.margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
 
      // Add image to PDF
      pdf.addImage(imgData, 'JPEG', opt.margin, opt.margin, imgWidth, imgHeight);
 
      // Save PDF
      pdf.save(opt.filename);
    });
  };
 
  return (
    <div>
      <Button variant="secondary" onClick={handleSaveAsPdf} className=''>Download</Button>{' '}
    </div>
  );
};
 
export default Pdf;
 