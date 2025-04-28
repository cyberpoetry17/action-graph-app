import "./input.css";

type InputProps = {
  id: string;
  key: React.Key;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  onClick?: () => void;
  onClearValue?: (id: string) => void;
};

const Input = ({
  id,
  key,
  value,
  placeholder,
  readOnly,
  onClick,
  onClearValue,
}: InputProps) => {
  return (
    <div className="input-container">
      <input
        className="input"
        key={key}
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        readOnly={readOnly}
      />
      {value && (
        <button
          onClick={() => onClearValue?.(id)}
          className="input-clear-button"
        >
          x
        </button>
      )}
    </div>
  );
};
export default Input;
