'use client'
import React, { useState } from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import formJson from "../src/form.json";

const config = {
  components: {
    Text: {
      render: ({ text }) => (
        <div style={{ 
          padding: '20px',
          margin: '20px',
          background: 'white',
          border: '2px solid #007bff',
          borderRadius: '4px',
          minHeight: '100px',
          whiteSpace: 'pre-wrap'
        }}>
          {text}
        </div>
      )
    },
    Form: {
      render: ({ radio1, textArea1 }) => {
        return (
          <div style={{ 
            padding: '20px',
            margin: '20px',
            background: 'white',
            border: '2px solid #28a745',
            borderRadius: '4px'
          }}>
            <h3>Bestellformular</h3>
            <div>
              <p><strong>Gewählte Lieferart:</strong> {radio1 || 'Keine Auswahl'}</p>
              {radio1 === 'lieferung' && (
                <div>
                  <p><strong>Lieferadresse:</strong></p>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{textArea1 || 'Keine Adresse angegeben'}</p>
                </div>
              )}
            </div>
          </div>
        );
      },
      fields: {
        radio1: {
          type: "radio",
          label: formJson.components[0].label, // "Lieferoptionen auswählen"
          options: formJson.components[0].values.map(option => ({
            label: option.label,
            value: option.value
          }))
        },
        textArea1: {
          type: "textarea",
          label: formJson.components[1].label, // "Lieferanschrift"
          show: (fields) => fields.radio1 === "lieferung"
        }
      },
      defaultProps: {
        radio1: "",
        textArea1: ""
      }
    }
  }
};

const LivePreviewWithPuck = () => {
  const [data, setData] = useState({
    content: [],
    zones: {}
  });

  // Text-Update-Funktion
  const handleDataChange = (newData) => {
    // Finde die Form-Komponente
    const formComponent = newData.content.find(item => item.type === 'Form');
    if (formComponent) {
      const { radio1, textArea1 } = formComponent.props;
      
      // Finde die Text-Komponente und aktualisiere sie
      const newContent = newData.content.map(item => {
        if (item.type === 'Text') {
          let outputText = `Vielen Dank für Ihre Bestellung\n\n`;
          if (radio1 === 'lieferung') {
            outputText += `Ihre Lieferart: Lieferung\n\n`;
            outputText += `Lieferadresse:\n${textArea1 || "Noch keine Adresse angegeben"}`;
          } else if (radio1 === 'abholung') {
            outputText += `Ihre Lieferart: Abholung`;
          } else {
            outputText += `Ihre Lieferart: noch nicht ausgewählt`;
          }
          return { ...item, props: { ...item.props, text: outputText }};
        }
        return item;
      });
      
      newData.content = newContent;
    }
    
    setData(newData);
  };

  return (
    <div style={{ 
      padding: '20px',
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      <Puck 
        config={config}
        data={data}
        onPublish={(newData) => {
          console.log('Publishing:', newData);
          handleDataChange(newData);
        }}
        onChange={(newData) => {
          console.log('Changed:', newData);
          handleDataChange(newData);
        }}
      />
    </div>
  );
};

export default LivePreviewWithPuck;