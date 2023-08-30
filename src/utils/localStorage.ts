import { v4 as uuidv4 } from 'uuid';
import { Note } from 'types';

export const getNotes = (): Note[] => {
  const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
  return savedNotes;
};

export const createNote = (note: string): Note[] => {
  const newNote: Note = {
    id: uuidv4(),
    description: note,
  };
  const notes = getNotes();
  const updatedNotes = [...notes, newNote];
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
  return updatedNotes;
};

export const deleteNote = (noteID: string): Note[] => {
  const notes = getNotes();
  const updatedNotes = notes.filter((note) => note.id !== noteID);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
  return updatedNotes;
};

export const updateNote = (noteID: string, newNoteDescription: string): Note[] => {
  const notes = getNotes();
  const updatedNotes = notes.map((oldNote) =>
    oldNote.id === noteID ? { ...oldNote, description: newNoteDescription } : oldNote,
  );
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
  return updatedNotes;
};
