import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { Button, ToolHeader, ToolPanel } from '../../components/ToolUi';

export function QrTool() {
  const [input, setInput] = useState('https://devtoolbox.app');
  const [image, setImage] = useState('');
  useEffect(() => {
    void QRCode.toDataURL(input, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: 'M',
    }).then(setImage);
  }, [input]);
  return (
    <>
      <ToolHeader
        title="QR Code Generator"
        description="Generate QR codes locally in your browser."
      />
      <div className="tool-grid">
        <ToolPanel title="Content">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </ToolPanel>
        <ToolPanel
          title="Preview"
          actions={
            <Button
              disabled={!image}
              onClick={() => {
                const link = document.createElement('a');
                link.href = image;
                link.download = 'qr-code.png';
                link.click();
              }}
            >
              Download PNG
            </Button>
          }
        >
          <div className="qr-preview">
            {image && <img src={image} alt="Generated QR code" />}
          </div>
        </ToolPanel>
      </div>
    </>
  );
}
