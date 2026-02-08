import React from 'react';
import { pdfTemplate } from './pdfTemplate';

const PDFDownloadButton = () => {
    const handleDownload = async () => {
        const formData = {
            surname: 'Doe',
            givenNames: 'John',
            email: 'john@example.com',
            mobile: '123456789',
        };

        const response = await fetch('http://localhost:5000/generate-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                html: pdfTemplate(formData),
            }),
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'application-form.pdf';
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            style={{
                padding: '12px 24px',
                background: '#1e40af',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
            }}
        >
            Download PDF
        </button>
    );
};

export default PDFDownloadButton;
