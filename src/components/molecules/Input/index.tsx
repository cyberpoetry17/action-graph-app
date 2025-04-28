import "./input.css";

type InputProps = {
  id?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  name?: string;
  dataTestId?: string;
  onClick?: () => void;
  onClearValue?: (id?: string) => void;
};

const Input = ({
  id,
  value,
  placeholder,
  readOnly,
  name,
  dataTestId,
  onClick,
  onClearValue,
}: InputProps) => {
  return (
    <div className="input-container">
      <input
        data-testid={dataTestId}
        className="default-input"
        name={name}
        key={id}
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        readOnly={readOnly}
      />
      {value && (
        <button
          data-testid="input-button"
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
