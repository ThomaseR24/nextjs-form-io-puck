"use client"
import React from 'react';
import { Form } from '@formio/react';
import formJson from '../src/form.json'; // Form.io JSON importieren

const FormComponent = () => {
  const handleSubmit = (submission) => {
    console.log('Formular-Daten:', submission.data);
  };

  return (
    <div>
      <h1>Formular</h1>
      <Form form={formJson} onSubmit={handleSubmit} />
    </div>
  );
};

export default FormComponent;
