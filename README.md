# Web Component Library

This project is a library of web components. It includes a demo page to showcase the usage of these components.

## Project Structure

- `src/components/my-component.ts`: This file exports a class `MyComponent` which extends from `HTMLElement`. It defines a custom web component with its own functionality and lifecycle callbacks.
- `src/index.ts`: This file is the entry point of the library. It imports `MyComponent` from `my-component.ts` and defines it as a custom element.
- `demo/index.html`: This file is a demo page for the web component library. It includes a script tag to load the compiled JavaScript file and uses the custom element defined in `my-component.ts`.

## Setup

To set up the project, follow these steps:

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm run build` to compile the TypeScript files to JavaScript.
4. Open `demo/index.html` in your browser to see the demo page.

## Usage

To use a component from this library, import it in your JavaScript or TypeScript file and use it as a custom element in your HTML.

For example:

```javascript
import { MyComponent } from 'web-component-library';

customElements.define('my-component', MyComponent);
```

Then in your HTML:

```html
<my-component></my-component>
```

## Contributing

Contributions are welcome. Please submit a pull request or create an issue to discuss the changes.