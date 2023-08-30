import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import { message } from 'antd';
import Paragraph from '../Paragraph';

interface NoteInputProps {
  addNote: (note: string) => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ addNote }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { description: string }) => {
    const { description } = values;
    addNote(description);
    form.resetFields();
    message.success(`${description} has been added to the note list successfully`);
  };

  return (
    <Form className='layout' form={form} name='notes' onFinish={onFinish}>
      <Form.Item
        labelCol={{ span: 24 }}
        className='notesInput'
        name='description'
        label={<Paragraph weight='700'>Add a Note</Paragraph>}
        rules={[
          {
            required: true,
            message: "You can't submit an empty note.",
          },
        ]}
      >
        <TextArea
          size='large'
          autoSize={{ minRows: 4, maxRows: 4 }}
          allowClear
          placeholder='Enter your thoughts here'
          maxLength={64}
        />
      </Form.Item>
      <FormItem labelCol={{ span: 24 }}>
        <Button htmlType='submit' type='primary'>
          Add
        </Button>
      </FormItem>
    </Form>
  );
};

export default NoteInput;
