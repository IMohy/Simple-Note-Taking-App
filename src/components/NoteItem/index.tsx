import { MinusCircleFilled, EditTwoTone } from '@ant-design/icons';
import Card from 'antd/es/card/Card';
import Button from 'antd/es/button/button';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import { useState } from 'react';
import { message } from 'antd';
import { Note } from 'types';
import EditInput from 'components/EditInput';
import Paragraph from 'components/Paragraph';

interface NoteItemProps {
  note: Note;
  notes: Note[];
  id: string;
  removeNote: (noteId: string) => void;
  editNote: (noteId: string, newDescription: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, removeNote, id, editNote, notes }) => {
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>(note.description);
  const isEditing = editingNote === note.id;

  const handleEdit = (noteId: string, description: string) => {
    setEditingNote(noteId);
    setEditedDescription(description);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setEditedDescription('');
  };

  const handleSaveEdit = (noteId: string) => {
    if (editedDescription.trim() !== '') {
      editNote(noteId, editedDescription);
      setEditingNote(null);
      message.success(`${editedDescription} has been updated successfully`);
    }
  };

  return (
    <Card hoverable style={{ padding: 0 }}>
      <Row className='noteItem'>
        <Col span={8}>
          {isEditing ? (
            <EditInput
              onBlur={handleCancelEdit}
              className='editInput'
              buttonLabel='Submit'
              onButtonClick={() => handleSaveEdit(note.id)}
              onChange={(e) => setEditedDescription(e.target.value)}
              value={editedDescription}
            />
          ) : (
            <Paragraph
              className='noteTitle'
              weight='500'
              withTooltip
              toolTipTitle={note.description}
              trigger='hover'
            >
              {note.description}
            </Paragraph>
          )}
        </Col>
        <div>
          <Button
            onClick={() => {
              removeNote(id);
              message.success(`${editedDescription} has been deleted successfully`);
            }}
            type='text'
            danger
            shape='circle'
            icon={<MinusCircleFilled />}
          />
          <Button
            type='text'
            shape='circle'
            icon={<EditTwoTone />}
            onClick={() => handleEdit(note.id, note.description)}
          />
        </div>
      </Row>
    </Card>
  );
};

export default NoteItem;
