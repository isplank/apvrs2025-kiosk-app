import React from 'react';
import { X, User, FileText, Video } from 'lucide-react';
import Button from '../common/Button';
import { formatters } from '../../utils/formatters';
import { MEDIA_TYPES } from '../../config/constants';
import PDFViewer from '../media/PDFViewer';

const EntryDetailModal = ({ entry, subspecialtyName, onClose, onViewMedia }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-40 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{entry.submission_title}</h2>
              <p className="text-blue-100 text-lg">
                Submitted by: {entry.submitter_title} {entry.submitter_first_name}{' '}
                {entry.submitter_last_name}
              </p>
              {entry.submitter_country && (
                <p className="text-blue-200 text-base mt-1">
                  Country: {entry.submitter_country}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-50 active:scale-95 transition-transform ml-4"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="inline-block bg-purple-100 text-purple-800 px-5 py-2 rounded-full text-lg font-bold">
            {subspecialtyName}
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <User size={28} /> Authors
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {formatters.formatAuthors(entry)}
            </p>
          </div>

          {entry.final_presentation_type && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Presentation Type
              </h3>
              <p className="text-gray-700 text-lg">{entry.final_presentation_type}</p>
            </div>
          )}

          {entry.presenter_name && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Presenter</h3>
              <p className="text-gray-700 text-lg">{entry.presenter_name}</p>
            </div>
          )}

          {entry.remarks && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Additional Information
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {entry.remarks}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 pt-4">
            {(entry.eposter_image || entry.pdf_file) && (
              <Button
                variant="secondary"
                size="lg"
                icon={FileText}
                onClick={() => onViewMedia('pdf', {
                  pdfUrl: entry.pdf_file,
                  imageUrl: entry.eposter_image,
                  audioUrl: entry.audio_file,
                  title: entry.submission_title
                })}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
              >
                View E-Poster
              </Button>
            )}

            {entry.video_file && (
              <Button
                variant="secondary"
                size="lg"
                icon={Video}
                onClick={() => onViewMedia('video', entry.video_file)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700"
              >
                Watch Video
              </Button>
            )}




            {entry.pdf_file && (
              <a
                href={formatters.getMediaUrl(entry.pdf_file)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-6 rounded-2xl text-xl font-bold hover:from-purple-700 hover:to-purple-800 flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-lg"
              >
                <FileText size={32} /> Download PDF
              </a>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-100 flex justify-center sticky bottom-0">
          <Button variant="primary" size="lg" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EntryDetailModal;