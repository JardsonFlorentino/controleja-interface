import  { useId, type InputHTMLAttributes, type ReactNode } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    fullWidth?: boolean;
    label?: string;
    error?: string;
    id?: string
}


const Input = ({icon, fullWidth, label, error, id, className, ...rest}: InputProps) => {

    const generatedId = useId()
    const inputId = id || generatedId
   
    
   return (
  <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
    {label && (
      <label htmlFor={inputId} className="block mb-2 font-medium text-sm text-gray-700">
        {label}
      </label>
    )}

    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          {icon}
          
        </div>
      )}

      <input
        id={inputId}
        className={`block w-full rounded-xl border ${error ? "border-red-500" : "border-gray-700"}
        bg-gray-800 px-4 py-3 text-sm text-gray-50
        transition-all focus:outline-none focus:ring-2
        ${error ? "focus:border-red-500 focus:ring-red-500/2" : "focus:border-primary-500 focus:ring-primary-500/2"}
        ${icon ? "pl-10" : ""}
        ${className}        
        `}
        {...rest}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
);

}

export default Input;