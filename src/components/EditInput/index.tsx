import Button from 'antd/es/button/button';
import Input from 'antd/es/input/';
import TextArea from 'antd/es/input/TextArea';
import Space from 'antd/es/space';

interface EditInputProps {
  value: string;
  onBlur: () => void;
  onChange: (e: any) => void;
  onButtonClick: () => void;
  buttonLabel: string;
  className?: string;
}

const EditInput: React.FC<EditInputProps> = ({
  onBlur,
  value,
  onChange,
  onButtonClick,
  buttonLabel,
  className,
}) => {
  return (
    <Space direction='vertical'>

      <Space.Compact className={className}>
        <TextArea
          className='editText'
          style={{ width: "750px", marginTop: '1rem' }}
          size='large'
          rows={4}
          placeholder='Edit your note'
          value={value} onChange={onChange}
          autoSize={{ minRows: 4, maxRows: 4 }}
          allowClear
        />

      </Space.Compact>
      <Space direction='horizontal' size={'large'}>
        <Button type='primary' onClick={onButtonClick}>
          {buttonLabel ?? 'Submit'}
        </Button>
        <Button type='dashed' onClick={onBlur}>
          Cancel
        </Button>
      </Space>
    </Space>
  );
};

export default EditInput;
