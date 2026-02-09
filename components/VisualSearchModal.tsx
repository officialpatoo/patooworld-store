
import React, { useState, useRef } from 'react';
import { performVisualSearch } from '../services/geminiService';

interface VisualSearchModalProps {
  onClose: () => void;
  onSearch: (query: string) => void;
}

const VisualSearchModal: React.FC<VisualSearchModalProps> = ({ onClose, onSearch }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        processImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setIsProcessing(true);
    const keywords = await performVisualSearch(base64);
    setIsProcessing(false);
    if (keywords) {
      onSearch(keywords);
      onClose();
    }
  };

  const startCamera = async () => {
    setShowCamera(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      const base64 = dataUrl.split(',')[1];
      setImage(dataUrl);
      processImage(base64);
      
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
      setShowCamera(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 relative overflow-hidden shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors text-2xl">&times;</button>
        
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Visual Discovery</h2>
          <p className="text-sm text-gray-500">Show us what you're looking for.</p>
        </div>

        {!image && !showCamera && (
          <div className="space-y-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gray-50 border-2 border-dashed border-gray-200 py-12 rounded-3xl flex flex-col items-center justify-center hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              </div>
              <span className="text-sm font-bold text-gray-600">Upload a Photo</span>
            </button>
            <button 
              onClick={startCamera}
              className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Use Camera</span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*" />
          </div>
        )}

        {showCamera && (
          <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-square">
            <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
            <button 
              onClick={capturePhoto}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-white/30 shadow-xl"
            ></button>
          </div>
        )}

        {image && (
          <div className="relative rounded-[2rem] overflow-hidden bg-gray-100 aspect-square border border-gray-100">
            <img src={image} className="w-full h-full object-cover" alt="Search source" />
            {isProcessing && (
              <div className="absolute inset-0 bg-indigo-600/20 backdrop-blur-sm flex items-center justify-center flex-col">
                <div className="w-full h-1 bg-white/30 absolute top-0 animate-[scan_2s_infinite]">
                  <div className="w-full h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                </div>
                <div className="bg-white/90 px-6 py-3 rounded-full flex items-center space-x-3 shadow-xl">
                  <div className="w-4 h-4 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
                  <span className="text-xs font-bold text-indigo-950 uppercase tracking-widest">AI Scanning...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default VisualSearchModal;
