import React from 'react';
import { FileText, Video } from 'lucide-react';
import { formatters } from '../../utils/formatters';

const EntryCard = ({ entry, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
    >
      {entry.eposter_link && (
        <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
          <FileText size={56} className="text-blue-500" />
        </div>
      )}
      {entry.video_file && !entry.eposter_link && (
        <div className="w-full h-40 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl mb-4 flex items-center justify-center">
          <Video size={56} className="text-green-500" />
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-tight">
        {entry.submission_title}
      </h3>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Submitter:</strong> {entry.submitter_first_name}{' '}
        {entry.submitter_last_name}
      </p>
      <p className="text-xs text-gray-500 line-clamp-1">
        <strong>Authors:</strong> {formatters.formatAuthors(entry)}
      </p>
    </div>
  );
};

export default EntryCard;