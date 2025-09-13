import React, { useState } from 'react';
import { QrScanner } from 'react-qr-scanner';

const QRCodeScanner = ({ onScan }) => {
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      onScan(data.text || data);
    }
  };

  const handleError = (err) => {
    setError('Camera error or permission denied');
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h3 className="text-lg font-semibold mb-2">Scan QR Code for Attendance</h3>
      <div className="w-full max-w-xs">
        <QrScanner
          onDecode={handleScan}
          onError={handleError}
          constraints={{ facingMode: 'environment' }}
          style={{ width: '100%' }}
        />
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default QRCodeScanner;
