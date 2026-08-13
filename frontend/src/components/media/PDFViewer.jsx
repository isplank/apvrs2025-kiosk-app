import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, X, Volume2, VolumeX, FileText, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import { formatters } from '../../utils/formatters';
import { getBackgroundStyle } from '../../config/backgrounds';

const PDFViewer = ({ entry, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [hasImagePreview, setHasImagePreview] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if we have an image preview
    if (entry.eposter_image) {
      setHasImagePreview(true);
      setIsImage(true);
    } else if (entry.pdf_file) {
      // No image preview, will show PDF directly
      setHasImagePreview(false);
      setIsImage(false);
    }

    // Setup audio
    if (entry.audio_file) {
      audioRef.current = new Audio(formatters.getMediaUrl(entry.audio_file));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [entry]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 0.5));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0 || !isImage) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging && isImage) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play();
      setIsAudioPlaying(true);
    }
  };

  const handleOpenFullPDF = () => {
    setShowPDF(true);
  };

  const handleShowImage = () => {
    setIsImage(true);
    setShowPDF(false);
  };

  // Full PDF View Mode
  if (showPDF && entry.pdf_file) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col"
        style={getBackgroundStyle('entries')}
      >
        <div className="bg-gray-900 bg-opacity-95 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-white text-2xl font-bold">{entry.submission_title}</h2>
            <p className="text-blue-300 text-lg">Entry Code: {entry.entry_code}</p>
          </div>
          <div className="flex gap-4">
            {hasImagePreview && (
              <Button variant="secondary" size="md" icon={ChevronLeft} onClick={handleShowImage}>
                Back to Preview
              </Button>
            )}
            <a
              href={formatters.getMediaUrl(entry.pdf_file)}
              download
              className="bg-green-600 text-white px-8 py-5 rounded-xl text-xl hover:bg-green-700 flex items-center gap-3 active:scale-95 transition-transform font-bold"
            >
              <Download size={28} /> Download
            </a>
            <Button variant="danger" size="md" icon={X} onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        <div className="flex-1 bg-gray-800">
          <iframe
            src={`${formatters.getMediaUrl(entry.pdf_file)}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
            className="w-full h-full"
            title="PDF Viewer"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    );
  }

  // Main Viewer - Image or PDF embed
  return (
  <div
    className="fixed inset-0 z-50 flex"
    style={getBackgroundStyle('entries')}
  >
    {/* Left Side - Entry Details Panel - UNCHANGED */}
    <div className={`bg-gray-900 bg-opacity-95 transition-all duration-300 overflow-y-auto ${showDetails ? 'w-[420px]' : 'w-0'}`}>
            {showDetails && (
              <div className="p-6 text-white h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-yellow-400">Entry Details</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Entry Code */}
                  <div>
                    <label className="text-sm text-gray-400 font-semibold">Entry Code</label>
                    <p className="text-lg font-mono bg-blue-900 px-3 py-2 rounded mt-1">
                      {entry.entry_code}
                    </p>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="text-sm text-gray-400 font-semibold">Title</label>
                    <p className="text-base mt-1 leading-relaxed">{entry.submission_title}</p>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm text-gray-400 font-semibold">Category</label>
                    <p className="text-base mt-1">{entry.category_name || 'N/A'}</p>
                  </div>

                  {/* Submitter */}
                  <div>
                    <label className="text-sm text-gray-400 font-semibold">Submitter</label>
                    <p className="text-base mt-1">
                      {entry.submitter_title} {entry.submitter_first_name} {entry.submitter_last_name}
                    </p>
                    {entry.submitter_country && (
                      <p className="text-sm text-gray-400 mt-1">Country: {entry.submitter_country}</p>
                    )}
                  </div>

                  {/* Authors */}
                  <div>
                    <label className="text-sm text-gray-400 font-semibold">Authors</label>
                    <p className="text-sm mt-1 leading-relaxed text-gray-300">
                      {formatters.formatAuthors(entry)}
                    </p>
                  </div>

                  {/* Presenter */}
                  {entry.presenter_name && (
                    <div>
                      <label className="text-sm text-gray-400 font-semibold">Presenter</label>
                      <p className="text-base mt-1">{entry.presenter_name}</p>
                    </div>
                  )}

                  {/* Presentation Type */}
                  {entry.final_presentation_type && (
                    <div>
                      <label className="text-sm text-gray-400 font-semibold">Presentation Type</label>
                      <p className="text-base mt-1">{entry.final_presentation_type}</p>
                    </div>
                  )}

                  {/* Remarks */}
                  {entry.remarks && (
                    <div>
                      <label className="text-sm text-gray-400 font-semibold">Remarks</label>
                      <p className="text-sm mt-1 leading-relaxed text-gray-300 whitespace-pre-wrap">
                        {entry.remarks}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

    {/* Right Side - Media Viewer */}
    <div className="flex-1 flex flex-col">
      {/* Content Display */}
      <div className="flex-1 overflow-hidden flex items-center relative">
        {isImage && hasImagePreview ? (
          // Image Preview
          <div
            className="w-full h-full flex items-center justify-center touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={formatters.getMediaUrl(entry.eposter_image)}
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
        ) : (
          // PDF Embed
          <div className="w-full h-full p-4">
            <iframe
              src={`${formatters.getMediaUrl(entry.pdf_file)}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full rounded-lg"
              title="PDF Preview"
              style={{ border: '2px solid rgba(255,255,255,0.1)' }}
            />
          </div>
        )}

        {/* Floating Control Buttons - Right Side */}
        <div
          className="fixed left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-50"
          style={{ pointerEvents: 'auto' }}
        >
          {!showDetails && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowDetails(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-2xl transition-all active:scale-95 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              title="Show Details"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {isImage && hasImagePreview && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-2xl transition-all active:scale-95 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                title="Zoom In"
              >
                <ZoomIn size={32} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-2xl transition-all active:scale-95 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                title="Zoom Out"
              >
                <ZoomOut size={32} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleReset(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-full shadow-2xl transition-all active:scale-95 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                title="Reset Zoom"
              >
                <RotateCcw size={32} />
              </button>
            </>
          )}

          {entry.audio_file && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleAudio(); }}
              className={`${isAudioPlaying ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white p-5 rounded-full shadow-2xl transition-all active:scale-95 cursor-pointer`}
              style={{ pointerEvents: 'auto' }}
              title={isAudioPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isAudioPlaying ? <VolumeX size={32} /> : <Volume2 size={32} />}
            </button>
          )}

          {entry.pdf_file && !showPDF && (
            <button
              onClick={(e) => { e.stopPropagation(); handleOpenFullPDF(); }}
              className="bg-purple-600 hover:bg-purple-700 text-white p-5 rounded-full shadow-2xl transition-all active:scale-95 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              title="Open Full PDF"
            >
              <FileText size={32} />
            </button>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-full shadow-2xl transition-all active:scale-95 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            title="Close"
          >
            <X size={32} />
          </button>
        </div>
      </div>

      {/* Bottom Info Bar */}
      {/* <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-90 px-8 py-3 rounded-full shadow-lg">
        <div className="flex justify-center gap-8 text-white text-base">
          {isImage && hasImagePreview ? (
            <>
              <span>🖱️ Drag to pan</span>
              <span>🔍 Zoom controls</span>
            </>
          ) : (
            <span>📄 PDF Preview</span>
          )}
          {entry.audio_file && <span>🔊 {isAudioPlaying ? 'Audio playing' : 'Audio available'}</span>}
          {entry.pdf_file && <span>📥 Full PDF available</span>}
        </div>
      </div> */}
    </div>
  </div>
);
};

export default PDFViewer;