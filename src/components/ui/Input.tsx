interface InputProps {
  placeholder: string;
  refrence?: any;
  type?: string;
  error?: string;
}

export const Input = ({ placeholder, refrence, type = "text", error }: InputProps) => {
  return (
    <div className="mb-4 w-full">
      <input
        ref={refrence}
        type={type}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
          error 
            ? 'border-red-500 focus:ring-red-400 bg-red-50' 
            : 'border-gray-300 focus:ring-purple-400'
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-1">⚠️ {error}</p>
      )}
    </div>
  );
};