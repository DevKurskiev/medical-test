import React from "react";
import { Box, Typography } from "../index";

import "./styles.scss";

const Field = ({
  label,
  error,
  showError,
  onChange,
  fieldName,
  value,
  isRequired,
  placeholder,
  isDateField,
  options,
}) => {
  return (
    <Box as="div" className={`field ${options && "select"}`}>
      <Typography variant="h3" className="label">
        {label}
        {showError && error && (
          <Box as="span" className="required">
            *
          </Box>
        )}
      </Typography>
      {options ? (
        <Box
          as="select"
          className={`input ${error && "input-error"}`}
          name={fieldName}
          value={value}
          onChange={(e) => onChange(fieldName, e.target.value)}
          required={isRequired}
        >
          <Box as="option" value="" disabled hidden>
            {placeholder}
          </Box>
          {options.map((option, index) => (
            <Box as="option" key={index} value={option.value}>
              {option.label}
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          as="input"
          className={`input ${error && "input-error"} ${
            isDateField && "isDateField"
          }`}
          type={isDateField ? "date" : "text"}
          name={fieldName}
          value={value}
          onChange={(e) => onChange(fieldName, e.target.value)}
          required={isRequired}
          placeholder={placeholder}
        />
      )}
      {showError && error && (
        <Box as="div" className="error">
          {error}
        </Box>
      )}
    </Box>
  );
};

export default Field;
