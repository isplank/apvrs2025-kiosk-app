import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, FileText, X } from 'lucide-react';
import Button from '../common/Button';
import { formatters } from '../../utils/formatters';

const ImageViewer = ({ imageUrl, pdfUrl, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="bg-gray-900 p-6 flex justify-between items-center">
        <div className="flex gap-4">
          <Button variant="secondary" size="md" icon={ZoomIn} onClick={handleZoomIn}>
            Zoom In
          </Button>
          <Button variant="secondary" size="md" icon={ZoomOut} onClick={handleZoomOut}>
            Zoom Out
          </Button>
          <Button variant="secondary" size="md" icon={RotateCcw} onClick={handleReset}>
            Reset
          </Button>
          {pdfUrl && (
            <a
              href={formatters.getMediaUrl(pdfUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-5 rounded-xl text-xl hover:bg-green-700 flex items-center gap-3 active:scale-95 transition-transform font-bold"
            >
              <FileText size={28} /> PDF
            </a>
          )}
        </div>
        <Button variant="danger" size="md" icon={X} onClick={onClose}>
          Close
        </Button>
      </div>

      <div
        className="flex-1 overflow-hidden flex items-center justify-center touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={formatters.getMediaUrl(imageUrl)}
          alt="E-Poster"
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s',
            maxWidth: '90%',
            maxHeight: '90%',
            userSelect: 'none',
            cursor: scale > 1 ? 'move' : 'default',
          }}
          draggable={false}
        />
      </div>

      <div className="bg-gray-900 p-4 text-center text-white text-lg">
        Pinch to zoom • Drag to pan • Tap controls above
      </div>
    </div>
  );
};

export default ImageViewer;