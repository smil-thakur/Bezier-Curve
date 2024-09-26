# Cubic Bézier Curve Generator

A simple cubic Bézier curve generator built using HTML, CSS, and JavaScript. This tool allows users to visualize and interact with cubic Bézier curves, providing an intuitive way to understand their properties and applications.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [References](#references)

## Features

- **Interactive Control Points:** Adjust control points to dynamically update the cubic Bézier curve.
- **Visualization:** Real-time rendering of the curve as control points are moved.
- **User-Friendly Interface:** Clean and simple UI for ease of use.
- **Customizable Resolution:** Change the resolution for a smoother or more segmented curve.

## Demo

You can try the live demo [here](https://smil-thakur.github.io/Bezier-Curve/).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/smil-thakur/Bezier-Curve
   ```
2. Navigate to the project directory:
   ```bash
   cd Bezier-Curve
   ```

## Usage

Open `index.html` in your web browser to start using the cubic Bézier curve generator. The interface allows you to drag control points and see how the curve changes in real-time.

### File Structure

```
Bezier-Curve/
├── index.html
├── styles.css
└── script.js
```

- `index.html`: The main HTML file that contains the structure of the application.
- `styles.css`: The CSS file for styling the application.
- `script.js`: The JavaScript file containing the logic for generating and interacting with the cubic Bézier curves.

### HTML

The HTML file sets up the basic structure of the application, including the canvas where the Bézier curve is drawn and the control points are manipulated.

### CSS

The CSS file provides styling to ensure the application looks clean and is easy to use.

### JavaScript

The JavaScript file handles the logic for drawing the cubic Bézier curves and updating them based on user interaction with the control points. The cubic Bézier curve is generated using the following formula:

```javascript
let t = i / resolution;
let it = 1 - t;
let curvePointX =
  it * it * it * p0.x +
  3 * it * it * t * p1.x +
  3 * it * t * t * p2.x +
  t * t * t * p3.x;
let curvePointY =
  it * it * it * p0.y +
  3 * it * it * t * p1.y +
  3 * it * t * t * p2.y +
  t * t * t * p3.y;
```

where `p0`, `p1`, `p2`, and `p3` are the control points of the cubic Bézier curve, and `resolution` is the number of segments used to render the curve.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.


## References

- [Bézier Curve - Wikipedia](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
