import React from 'react';
import { pdf } from '@react-pdf/renderer';
import RemdererPDF from './rendererPdf';

const PDFDownloadButton = () => {
    const handleDownload = async () => {
        try {
            // Generate PDF blob
            const blob = await pdf(<RemdererPDF />).toBlob();

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'KeyInvest-Application-Form.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(url);

            console.log('PDF downloaded successfully');
        } catch (error) {
            console.error('Error downloading PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <button
            onClick={handleDownload}
            style={{
                padding: '12px 24px',
                backgroundColor: '#1e40af',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                margin: '20px'
            }}
        >
            Download PDF
        </button>
    );
};

export default PDFDownloadButton;