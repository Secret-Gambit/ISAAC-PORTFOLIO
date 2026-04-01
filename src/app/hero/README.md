# Cyber Typewriter Component

A cyber-themed typing animation component for React/Next.js portfolios with neon glow effects, glitch animations, and smooth type/delete loops.

## Features

- ✅ **Looping Animation** - Cycles through multiple phrases automatically
- ✅ **Type & Delete** - Smooth typing and backspace animation
- ✅ **Neon Glow** - Cyan neon text with pink neon cursor
- ✅ **Glitch Effect** - Subtle RGB split glitch for cyber feel
- ✅ **Responsive** - Works on desktop and mobile
- ✅ **Configurable** - Easy to customize phrases and speed

## Installation

1. Copy the files to your project:
   ```
   src/app/hero/CyberTypewriter.jsx
   src/app/hero/CyberTypewriter.css
   src/app/hero/Hero.jsx (example)
   ```

2. Import the component where needed:
   ```jsx
   import CyberTypewriter from './hero/CyberTypewriter';
   import './hero/CyberTypewriter.css';
   ```

## Usage

### Basic Usage

```jsx
import CyberTypewriter from './hero/CyberTypewriter';
import './hero/CyberTypewriter.css';

export default function Hero() {
  return (
    <section className="hero">
      <CyberTypewriter />
    </section>
  );
}
```

### With Container Styling

```jsx
<div className="cyber-typewriter-container">
  <CyberTypewriter />
</div>
```

## Customization

### Changing Phrases

Edit `CyberTypewriter.jsx` and modify the `phrases` array:

```jsx
const phrases = [
  "Hi, I'm Sogbola Isaac",
  "Creative Graphics Designer",
  "Motion Graphics Artist",
  "Add your custom phrase here"
];
```

### Adjusting Speed

In `CyberTypewriter.jsx`, change the speed constants:

```jsx
const typeSpeed = isDeleting ? 50 : 100;  // Delete: 50ms, Type: 100ms per char
const pauseTime = 2000;  // Pause 2 seconds after typing
```

### Changing Colors

Edit `CyberTypewriter.css`:

```css
.cyber-text {
  color: #00f3ff;  /* Cyan neon */
  text-shadow: 0 0 5px #00f3ff, ...;
}

.cyber-cursor {
  background: #ff00ff;  /* Pink neon */
  box-shadow: 0 0 5px #ff00ff, ...;
}
```

## Integration into Existing Project

### Step 1: Copy Files
Copy the three files to your project's component folder.

### Step 2: Import CSS
Add to your global CSS or component:
```jsx
import './hero/CyberTypewriter.css';
```

### Step 3: Use Component
Replace your hero heading:
```jsx
// Before
<h1>Hi, I'm Sogbola Isaac</h1>

// After
<CyberTypewriter />
```

### Step 4: Ensure Dark Background
The neon effect works best on dark backgrounds:
```css
.hero-section {
  background: #0a0a0a;
  min-height: 100vh;
}
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive

## Performance Notes

- Uses `requestAnimationFrame` pattern via `setTimeout`
- Minimal re-renders (only on character change)
- CSS animations are GPU-accelerated
- Lightweight (~3KB total)

## Troubleshooting

**Text not visible?**
- Ensure background is dark (#0a0a0a or similar)
- Check CSS is imported correctly

**Animation too fast/slow?**
- Adjust `typeSpeed` values in the component

**Glitch effect too strong?**
- Reduce opacity in `.glitch::before, .glitch::after`
- Or remove the `glitch` class from the span

## License

Free to use in personal and commercial projects.
