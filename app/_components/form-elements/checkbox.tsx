import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        {...props}
        className={`w-4 h-4 border border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      {label && <label className="text-sm text-gray-700">{label}</label>}
    </div>
  );
};

export default Checkbox;
