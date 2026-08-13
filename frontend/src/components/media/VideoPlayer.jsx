import React, { useRef, useEffect, useState } from 'react';
import { X, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatters } from '../../utils/formatters';
import { getBackgroundStyle } from '../../config/backgrounds';

const VideoPlayer = ({ entry, onClose }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (entry.audio_file) {
      audioRef.current = new Audio(formatters.getMediaUrl(entry.audio_file));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [entry.audio_file]);

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

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={getBackgroundStyle('entries')}
    >
      {/* Left Side - Entry Details Panel */}
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

      {/* Right Side - Video Player */}
      <div className="flex-1 flex items-center relative p-8">
        {/* Video Container */}
        <video
          ref={videoRef}
          controls
          autoPlay
          className="rounded-lg shadow-2xl"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto'
          }}
        >
          <source src={formatters.getMediaUrl(entry.video_file)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

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

          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-full shadow-2xl transition-all active:scale-95 cursor-pointer"
            style={{ pointerEvents: 'auto' }}
            title="Close"
          >
            <X size={32} />
          </button>
        </div>

        {/* Bottom Info Bar */}
        {/* <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-90 px-8 py-3 rounded-full shadow-lg">
          <div className="flex gap-8 text-white text-base">
            <span>📹 Video Playback</span>
            {entry.audio_file && <span>🔊 {isAudioPlaying ? 'Narration playing' : 'Narration available'}</span>}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default VideoPlayer;
