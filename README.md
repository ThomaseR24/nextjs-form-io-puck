# Form.io + Puck Live Preview Integration

A Next.js application that connects Form.io forms with Puck.js for dynamic document previews.

## Demo
Check out the live demo: [https://nextjs-form-io-puck.vercel.app/](https://nextjs-form-io-puck.vercel.app/)

```bash

Login:
Username: test1234
Password: test1234

```

## Description

This application allows:
- Display of Form.io forms
- Live preview of form data
- Integration with Puck.js for template-based outputs
- Debug mode for development

## Installation

1. Clone the repository:
```bash
git clone https://github.com/formio/nextjs-form-io-puck.git
cd nextjs-form-io-puck 
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Access Information
The application will be available at `http://localhost:3000`.

```bash

Login:
Username: test1234
Password: test1234

```

## Form.io Integration

1. Create a form in Form.io Builder
2. Export JSON and save it in `src/form.json`

Example form.json:
```json
{
  "display": "form",
  "components": [
    {
      "type": "radio",
      "key": "radio1",
      "label": "Select delivery options",
      "values": [
        {
          "value": "delivery",
          "label": "Delivery"
        },
        {
          "value": "pickup",
          "label": "Pickup"
        }
      ]
    },
    {
      "type": "textarea",
      "key": "textArea1",
      "label": "Delivery address",
      "conditional": {
        "show": true,
        "when": "radio1",
        "eq": "delivery"
      }
    }
  ]
}
```

## Technologies

- Next.js
- React
- Form.io
- Puck.js
- TypeScript

## License

MIT

## Components

### LivePreviewWithPuck.js

Main component that handles form data and preview rendering:

```javascript
import { LivePreviewWithPuck } from '../components/LivePreviewWithPuck';

// Usage in page.tsx
export default function Page() {
  return <LivePreviewWithPuck />;
}
```

Features:
- Real-time form data processing
- Dynamic preview updates
- Debug mode toggle
- Responsive layout

### Form Integration

The form component uses Form.io to render and handle form data:
- Radio buttons for delivery options
- Conditional text areas
- Real-time validation
- Dynamic field visibility

### Preview Features

The preview section shows:
- Live updates of form data
- Formatted text output
- Debug information when enabled
- Customizable styling

## Development

### Required Dependencies

```json
{
  "@formio/react": "^5.2.4-rc.1",
  "@measured/puck": "^0.13.0",
  "next": "14.0.4",
  "react": "^18",
  "react-dom": "^18"
}
```

### Project Structure

```
├── app/
│   ├── page.tsx          # Main page component
│   └── globals.css       # Global styles
├── components/
│   └── LivePreviewWithPuck.js  # Main component
├── src/
│   └── form.json         # Form configuration
└── puck.config.js        # Puck configuration
```

### Future Integration with Puck

Planned features:
- Visual template editor
- Custom component library
- Dynamic layout configuration
- Template management system

## Workflow

### Form.io to Puck Integration Flow

1. Form Creation:
   - Design form in Form.io Builder
   - Define conditional logic
   - Export form configuration

2. Template Setup:
   - Create text templates in Puck
   - Define placeholder positions
   - Set up dynamic content areas

3. Live Preview:
   - Form data automatically updates preview
   - Real-time template rendering
   - Debug mode for testing
