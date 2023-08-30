import { useEffect, useState } from 'react';

import { Note } from 'types';
import NoteInput from 'components/NoteInput';
import NoteList from 'components/NoteList';
import { createNote, getNotes } from 'utils/localStorage';

const HomePage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    const savedNotes = getNotes();
    setNotes(savedNotes);
  }, []);

  const addNote = (note: string) => {
    const updatedNotes = createNote(note);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <NoteInput addNote={addNote} />
      <NoteList setNotes={setNotes} notes={notes} />
    </div>
  );
};

export default HomePage;
