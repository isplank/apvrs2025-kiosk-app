import React, { useCallback, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { entryService } from '../services/api/entryService';
import { useSearch } from '../hooks/useSearch';
import ScreenLayout from '../components/layout/ScreenLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import EntryCard from '../components/entry/EntryCard';
import PDFViewer from '../components/media/PDFViewer';
import VideoPlayer from '../components/media/VideoPlayer';
import { SCREENS, MESSAGES } from '../config/constants';

const EntriesScreen = () => {
  const { selectedOrg, selectedMenu, selectedSubspecialty, onNavigate, onHome } = useAppContext();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingEntry, setViewingEntry] = useState(null);
  const [viewType, setViewType] = useState(null);

  const { query, filteredItems, handleSearch, resultCount } = useSearch(entries, [
    'submission_title',
    'submitter_first_name',
    'submitter_last_name',
    'remarks',
    'entry_code',
    'entry_id'
  ]);

  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await entryService.getEntries({
        subspecialtyId: selectedSubspecialty.id,
        subspecialtyType: selectedOrg.code,
        menuCode: selectedMenu.code,
      });

      const enrichedData = data.map(entry => ({
        ...entry,
        category_name: selectedSubspecialty.name
      }));

      setEntries(enrichedData);
    } catch (err) {
      setError(err.message || MESSAGES.ERROR_LOAD);
    } finally {
      setLoading(false);
    }
  }, [selectedOrg, selectedMenu, selectedSubspecialty]);

  useEffect(() => {
    if (selectedSubspecialty && selectedMenu) {
      loadEntries();
    }
  }, [selectedSubspecialty, selectedMenu, loadEntries]);

  const handleBack = () => {
    onNavigate(SCREENS.SUBSPECIALTIES, { selectedSubspecialty: null });
  };

  const handleEntryClick = (entry) => {
    if (entry.video_file) {
      setViewType('video');
      setViewingEntry(entry);
    } else if (entry.eposter_image || entry.pdf_file) {
      setViewType('pdf');
      setViewingEntry(entry);
    }
  };

  const handleCloseViewer = () => {
    setViewingEntry(null);
    setViewType(null);
  };

  return (
    <>
      <ScreenLayout
        backgroundType="entries"
        headerProps={{
          onBack: handleBack,
          onHome: onHome
        }}
        footerProps={{
          text: `${selectedOrg?.name} - ${selectedSubspecialty?.name}`
        }}
      >
        <div className="h-full flex flex-col px-8">
          {/* Title at Top */}
          <div className="pt-8 pb-8">
            <h1 className="text-5xl font-bold text-white drop-shadow-2xl text-center">
              {selectedSubspecialty?.name}
            </h1>
          </div>

          {/* Search Bar */}
          <div className="pb-8">
            <div className="relative max-w-3xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={28}
              />
              <input
                type="text"
                placeholder="Search by title, author, entry code, or remarks..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-6 text-xl rounded-2xl border-4 border-blue-300 focus:outline-none focus:border-blue-500 shadow-lg bg-white bg-opacity-90"
              />
            </div>
            {query && (
              <p className="text-white text-lg mt-3 text-center drop-shadow-lg">
                Found {resultCount} result{resultCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="mt-12"></div>
          <div className="mt-12"></div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <ErrorMessage message={error} onRetry={loadEntries} />
            ) : filteredItems.length === 0 ? (
              <div className="text-white text-3xl text-center mt-12 drop-shadow-lg">
                {MESSAGES.NO_ENTRIES}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 pb-8">
                {filteredItems.map((entry) => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    onClick={() => handleEntryClick(entry)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </ScreenLayout>

      {/* Media Viewers */}
      {viewingEntry && viewType === 'pdf' && (
        <PDFViewer entry={viewingEntry} onClose={handleCloseViewer} />
      )}

      {viewingEntry && viewType === 'video' && (
        <VideoPlayer entry={viewingEntry} onClose={handleCloseViewer} />
      )}
    </>
  );
};

export default EntriesScreen;
