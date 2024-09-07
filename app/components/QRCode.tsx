import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
  value: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ value }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, (error) => {
        if (error) console.error('Error generating QR code:', error);
      });
    }
  }, [value]);

  return <canvas ref={canvasRef} />;
};

export default QRCodeComponent;