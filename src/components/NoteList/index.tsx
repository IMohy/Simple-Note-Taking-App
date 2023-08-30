import { Space, Pagination } from 'antd';
import { Empty } from 'antd';
import { useState, useMemo } from 'react';
import Search from 'antd/es/input/Search';
import { Note } from 'types';
import NoteItem from 'components/NoteItem';
import Paragraph from 'components/Paragraph';
import { deleteNote, updateNote } from 'utils/localStorage';

interface NoteListProps {
  notes: Note[];
  setNotes: (value: React.SetStateAction<Note[]>) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, setNotes }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>(''); // New state for search

  const filteredNotes = useMemo(
    () =>
      notes.filter((note) => note.description.toLowerCase().includes(searchQuery.toLowerCase())),
    [notes, searchQuery],
  );

  const showNotesOrPagination = Boolean(filteredNotes.length);
  const notesPerPage = 5;
  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const displayedNotes = useMemo(
    () => filteredNotes.slice(startIndex, endIndex),
    [endIndex, filteredNotes, startIndex],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const removeNote = (noteId: string) => {
    const updatedNotes = deleteNote(noteId);
    const remaining = displayedNotes.filter((note: Note) => note.id !== noteId);
    if (!remaining?.length) {
      setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    }

    setNotes(updatedNotes);
  };
  const handleSearch = (value: string) => {
    if (value.trim() !== '') {
      setSearchQuery(value);
      setCurrentPage(1);
    }
  };

  const editNote = (noteId: string, newDescription: string) => {
    const updatedNotes = updateNote(noteId, newDescription);
    setNotes(updatedNotes);
  };

  return (
    <Space className='layout'>
      <Search
        className='searchInput'
        placeholder='Search Notes'
        allowClear
        enterButton='Search'
        size='large'
        onSearch={handleSearch}
      />
      {showNotesOrPagination ? (
        displayedNotes.map((note) => (
          <NoteItem
            editNote={editNote}
            key={note.id}
            note={note}
            notes={notes}
            removeNote={removeNote}
            id={note.id}
          />
        ))
      ) : (
        <Empty
          description={<Paragraph weight='700'>Ops, Seems Like there is no notes here</Paragraph>}
        />
      )}
      {showNotesOrPagination ? (
        <Space direction='vertical' size='middle' style={{ display: 'flex', padding: '40px' }}>
          <Pagination
            showTotal={(total) => (
              <Paragraph weight='700'>{`Total ${total} note${total >= 2 ? 's' : ''}`}</Paragraph>
            )}
            current={currentPage}
            pageSize={notesPerPage}
            total={filteredNotes.length}
            onChange={handlePageChange}
          />
        </Space>
      ) : null}
    </Space>
  );
};
export default NoteList;
