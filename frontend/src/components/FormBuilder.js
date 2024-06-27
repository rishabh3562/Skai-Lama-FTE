import React from 'react';

const FormBuilder = ({ fields, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <div key={index} className="form-group">
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={field.value}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;
