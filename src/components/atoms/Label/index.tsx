import "./index.css";

type LabelProps = {
  children: React.ReactNode;
};

const Label = ({ children }: LabelProps) => {
  return <label className="label">{children}</label>;
};
export default Label;
