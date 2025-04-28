import "./label.css";

type LabelProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Label = ({ children, style, className = "" }: LabelProps) => {
  return (
    <label className={`default-label ${className}`} style={style}>
      {children}
    </label>
  );
};
export default Label;
