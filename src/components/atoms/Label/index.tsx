import "./label.css";

type LabelProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dataTestId?: string;
};

const Label = ({ children, style, dataTestId, className = "" }: LabelProps) => {
  return (
    <label
      className={`default-label ${className}`}
      style={style}
      data-testid={dataTestId}
    >
      {children}
    </label>
  );
};
export default Label;
