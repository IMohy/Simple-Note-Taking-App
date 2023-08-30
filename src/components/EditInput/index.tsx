import Button from 'antd/es/button/button';
import Input from 'antd/es/input/';
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
    <Space.Compact className={className}>
      <Input maxLength={64} allowClear value={value} onChange={onChange} />
      <Button type='primary' onClick={onButtonClick}>
        {buttonLabel ?? 'Submit'}
      </Button>
      <Button type='dashed' onClick={onBlur}>
        Cancel
      </Button>
    </Space.Compact>
  );
};

export default EditInput;
