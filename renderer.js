const { ipcRenderer } = window.electron;
const PDFDocument = require('pdfkit');
const fs = require('fs');

const convertBtn = document.getElementById('convertBtn');
const fileInput = document.getElementById('fileInput');
console.log(convertBtn);
convertBtn.addEventListener('click', () => {
    console.log('Button clicked!');
    outputStream.on('finish', () => {
        dialog.showMessageBox({
            type: 'info',
            message: 'Conversion Successful!',
            detail: 'PDF file has been created.',
            buttons: ['OK']
        });
    })
    const filePaths = fileInput.files;
    console.log(filePaths);
    if (!filePaths.length) return;

    const pdfDoc = new PDFDocument();
    const pdfPath = path.join(__dirname, 'converted.pdf');
    const outputStream = fs.createWriteStream(pdfPath);

    for (let i = 0; i < filePaths.length; i++) {
        const imagePath = filePaths[i].path; // Path to each image file
        pdfDoc.image(imagePath, 0, 0, { width: 600 });
        if (i !== filePaths.length - 1) {
            pdfDoc.addPage();
        }
    }
    console.log("done");
    pdfDoc.pipe(outputStream);
    pdfDoc.end();

    outputStream.on('finish', () => {
        ipcRenderer.send('conversion-done', pdfPath);
    });
});
m