type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export default function Button({
  children,
  disabled,
  onClick,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg py-4 px-6 text-center disabled:opacity-35 ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
