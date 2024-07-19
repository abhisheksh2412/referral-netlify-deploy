import clsx from "clsx";
import React from "react";

const GlobalInput = ({
  parentClassName,
  leftIconClassName,
  className,
  rightIconClassName,
  inputClassName,
  type,
  required,
  name,
  value,
  placeholder,
  onChange,
  onInput,
  leftIcon,
  rightIcon,
  error,
}) => {
  return (
    <div className={className}>
      <div className={clsx("flex items-center", parentClassName)}>
        {leftIcon && (
          <div className={clsx("flex items-center", leftIconClassName)}>
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onInput={onInput}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx("flex-grow", inputClassName)}
        />
        {rightIcon && (
          <div className={clsx("flex items-center", rightIconClassName)}>
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs py-1">{error}</p>}
    </div>
  );
};

export default GlobalInput;
