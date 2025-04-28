import "./button.css";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
}

type ButtonProps = {
  text: string;
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ text, variant, disabled, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
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
