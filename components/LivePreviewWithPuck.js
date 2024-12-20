'use client'
import React, { useState, useEffect } from "react";
import { Form } from "@formio/react";
import formJson from "../src/form.json";

const defaultData = {
  root: {
    children: [
      {
        type: "Text",
        props: {
          text: `Vielen Dank für Ihre Bestellung

Ihre Lieferart: noch nicht ausgewählt`
        }
      }
    ]
  }
};

const LivePreviewWithPuck = () => {
  const [formData, setFormData] = useState({});
  const [documentContent, setDocumentContent] = useState(defaultData);
  const [showDebug, setShowDebug] = useState(false);
  const [formInstance, setFormInstance] = useState(null);

  useEffect(() => {
    if (formInstance) {
      formInstance.submission = { data: formData };
    }
  }, [formInstance, formData]);

  const onFormChange = (changed) => {
    console.log('Form Change Event triggered');
    console.log('Changed data:', changed);
    
    if (changed && changed.data) {
      const { radio1, textArea1 } = changed.data;
      console.log('Radio1:', radio1);
      
      let outputText = `Vielen Dank für Ihre Bestellung\n\n`;
      
      if (radio1 === 'lieferung') {
        outputText += `Ihre Lieferart: Lieferung\n\n`;
        outputText += `Lieferadresse:\n${textArea1 || "Noch keine Adresse angegeben"}`;
      } else if (radio1 === 'abholung') {
        outputText += `Ihre Lieferart: Abholung`;
      } else {
        outputText += `Ihre Lieferart: noch nicht ausgewählt`;
      }
      
      const newContent = {
        root: {
          children: [
            {
              type: "Text",
              props: {
                text: outputText
              }
            }
          ]
        }
      };
      
      setFormData(changed.data);
      setDocumentContent(newContent);
    }
  };

  const onFormReady = (form) => {
    console.log('Form is ready');
    setFormInstance(form);
    
    // Sicheres Logging der Formularstruktur
    if (form) {
      console.log('Form structure:', form);
      // Überprüfen der verfügbaren Eigenschaften
      console.log('Available form properties:', Object.keys(form));
    }
  };

  return (
    <div style={{ 
      position: 'fixed',  // Fixierte Position
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',  // Scrollbar wenn nötig
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ 
        maxWidth: '1200px',  // Maximale Breite
        margin: '0 auto',    // Zentrieren
        padding: '2rem',
        height: '80%'       // Volle Höhe
      }}>
        <div style={{ 
          display: "flex", 
          flexDirection: "row", 
          gap: "20px", 
          padding: "20px",
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          height: 'calc(100% - 4rem)'  // Höhe minus Padding
        }}>
          <div style={{ flex: 1, borderRight: "1px solid #ccc", padding: "20px" }}>
            <h2>Formular</h2>
            <Form 
              form={formJson}
              onChange={onFormChange}
              onRender={onFormReady}
              options={{
                readOnly: false,
                noAlerts: true
              }}
            />
          </div>
          <div style={{ flex: 1, padding: "20px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Live-Vorschau</h2>
              <button
                onClick={() => setShowDebug(!showDebug)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: showDebug ? '#dc3545' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {showDebug ? 'Debug ausblenden' : 'Debug einblenden'}
              </button>
            </div>
            <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "4px" }}>
              {showDebug ? (
                <div style={{ 
                  marginBottom: '1rem', 
                  padding: '0.5rem',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #dee2e6',
                  borderRadius: '4px',
                  fontSize: '12px', 
                  color: '#666' 
                }}>
                  <strong>Debug Info:</strong><br/>
                  Current text: {documentContent.root.children[0].props.text}
                </div>
              ) : (
                <div style={{ 
                  padding: '1rem',
                  whiteSpace: 'pre-wrap'
                }}>
                  {documentContent.root.children[0].props.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <p style={{ display: 'block', color: 'black', textAlign: 'center' }}>
        <a href="https://github.com/ThomaseR24/nextjs-form-io-puck" target="_blank" rel="noopener noreferrer">
          Demo Quellcode GitHub
        </a>
      </p>
    </div>
    
  );
};

export default LivePreviewWithPuck;
