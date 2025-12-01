import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "secondary" | "success" |"danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: ButtonVariant,
    fullWidth?: boolean,
    isLoading?: boolean,
}
const Button = ({
    children,
    variant = "primary",
    fullWidth = false,
    isLoading = false,
    className,
    disabled,
    ...rest
}: ButtonProps) => {
    const variantClasses = {
    primary:
      "bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600 active:translate-y-0",
    outline:
      "border border-primary-500 text-primary-500 hover:bg-primary-500/10 ",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 ",
    success: "bg-green-500  text-[#051626]  hover:brightness-90",
    danger: "bg-red-500  font-semibold text-[#051626]   hover:brightness-90",
  };

  const renderLoanding = () => (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <title>Loanding spinner</title>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      {children}
    </div>
  );

  return (
    
        <button 
        type="button" 
        className={`cursor-pointer px-5 py-2.5 rounded-xl font-medium transition-all flex items-center juastify-center
             ${variantClasses[variant]} 
             ${isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""}
             ${className}
             ${fullWidth ? "w-full" : ""} 
             `}
             disabled={isLoading || disabled}
             {...rest}
        >
            { isLoading ? renderLoanding() : children}
        </button>  
  )
}

export default Button;