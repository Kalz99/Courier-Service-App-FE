import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-2.5 w-full py-2.5 px-3 bg-primary hover:bg-primary-hover text-white border-none rounded-xl text-sm font-semibold cursor-pointer shadow-[0_6px_20px_var(--color-primary-glow)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(123,87,223,0.35)] active:translate-y-0 active:shadow-[0_4px_12px_var(--color-primary-glow)] transition-all duration-200 max-md:rounded-full max-md:w-11 max-md:h-11 max-md:p-0 max-md:shadow-none group ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="inline-flex items-center justify-center bg-white/15 rounded-md p-0.5 group-hover:rotate-90 transition-transform duration-200 shrink-0">
        <PlusIcon className="w-4 h-4 stroke-current" />
      </span>
      <span className="max-md:hidden truncate">{children || 'Add a shipment'}</span>
    </button>
  );
};

export default Button;
