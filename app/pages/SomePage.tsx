import React from 'react';
import QRCodeComponent from '../components/QRCode';

function SomePage() {
  return (
    <div>
      <h1>QR Code Example</h1>
      <QRCodeComponent value="https://example.com" />
    </div>
  );
}

export default SomePage;