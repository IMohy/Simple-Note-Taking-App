import Tooltip from 'antd/es/tooltip';
import { Typography } from 'antd';

interface ParagraphProps {
  children: React.ReactNode;
  weight?: string;
  toolTipTitle?: string;
  withTooltip?: boolean;
  className?: string;
  trigger?: 'click' | 'contextMenu' | 'focus' | 'hover';
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  weight,
  toolTipTitle,
  withTooltip,
  trigger,
  className,
}) => {
  return (
    <Tooltip title={withTooltip ? toolTipTitle : ''} trigger={trigger}>
      <Typography className={className} style={{ fontWeight: weight, marginTop: '2.5px' }}>
        {children}
      </Typography>
    </Tooltip>
  );
};

export default Paragraph;
