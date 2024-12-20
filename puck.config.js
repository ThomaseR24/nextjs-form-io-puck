'use client'
import React from 'react';

const config = {
  components: {
    Text: {
      render: ({ text }) => (
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#fff',
          border: '1px solid #dee2e6',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          lineHeight: '1.8',
          color: '#212529',
          whiteSpace: 'pre-wrap',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {text}
        </div>
      ),
      fields: {
        text: { type: "text" }
      }
    }
  },
  defaultProps: {
    Text: {
      text: "Vielen Dank für Ihre Bestellung\n\nIhre Lieferart: noch nicht ausgewählt"
    }
  }
};

export default config;