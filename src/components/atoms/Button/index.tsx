import "./button.css";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
}

type ButtonProps = {
  text: string;
  variant: ButtonVariant;
  disabled?: boolean;
  dataTestId?: string;
  onClick?: () => void;
};

const Button = ({
  text,
  variant,
  disabled,
  dataTestId,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
      className={`default-button ${
        variant === ButtonVariant.Primary
          ? "button-primary"
          : "button-secondary"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
