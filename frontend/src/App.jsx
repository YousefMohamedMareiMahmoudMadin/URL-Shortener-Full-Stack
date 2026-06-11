import { useState } from 'react';
import axios from 'axios';
import QRCodeGenerator from 'qrcode';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export default function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, { originalUrl: url });
      const generatedShortUrl = response.data.shortUrl;
      
      setShortUrl(generatedShortUrl);
      setCopied(false);

      const qrCodeDataUrl = await QRCodeGenerator.toDataURL(generatedShortUrl, {
        width: 200,
        margin: 2,
        color: { dark: '#5000ca', light: '#ffffff' }
      });
      setQrImage(qrCodeDataUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
      alert('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-100">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-neutral-800 tracking-tight">
          URL Shortener
        </h1>
        
        <div className="flex flex-col gap-4">
          <input
            type="url"
            placeholder="Enter URL to shorten (e.g. https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border border-neutral-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
          />
          
          <button
            onClick={handleShorten}
            disabled={loading || !url}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-300 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-purple-600/20 disabled:shadow-none"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>

        {shortUrl && (
          <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col items-center gap-4">
            <div className="w-full text-center">
              <p className="text-sm font-medium text-neutral-500 mb-1">Your Shortened URL</p>
              <div className="flex gap-2 items-center justify-between bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium break-all px-2">
                  {shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className={`font-semibold py-2 px-4 rounded-lg text-sm cursor-pointer transition-all shrink-0 ${
                    copied ? 'bg-emerald-500 text-white' : 'bg-neutral-800 hover:bg-neutral-900 text-white'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {qrImage && (
              <div className="mt-4 flex flex-col items-center bg-neutral-50 p-6 rounded-2xl border border-neutral-200/60 text-center">
                <img src={qrImage} alt="QR Code" className="w-44 h-44 mb-3 rounded-lg shadow-sm" />
                <p className="text-xs text-neutral-500 mb-3">Scan the QR code to open the link</p>
                <a href={qrImage} download="qrcode.png" className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors">
                  Download QR Code
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}