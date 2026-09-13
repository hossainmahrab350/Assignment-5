# Dev Stack

Dev Stack is a responsive React app for discovering development technologies and assembling a personalized toolkit.

## Built with

- React and Vite
- CSS with a reusable orange-to-pink-to-violet gradient theme
- React-Toastify
- Local JSON technology data

## Features

- Responsive desktop, tablet, and mobile layouts with a sticky navigation bar.
- Explore twelve technology cards and add each one only once to a personal stack.
- Clear individual items or the full stack, with helpful feedback notifications.

## Run locally

```bash
npm install
npm run dev
```

## React questions

**1. What is JSX, and why is it used in React?**  
JSX is a syntax that lets us describe UI using HTML-like code inside JavaScript. It makes components easier to read and write.

**2. What is the difference between props and state?**  
Props are values a parent sends into a component. State is data a component owns and can update over time.

**3. What does the `useState` hook do, and where did you use it in this project?**  
`useState` stores changing data and refreshes the UI after an update. This app uses it for the selected stack, loading status, and mobile menu.

**4. What does the `useEffect` hook do, and why did you need it to load the JSON data?**  
`useEffect` runs side effects after rendering. It fetches the local technology JSON once when the app first loads.

**5. Why does every item in a `.map()` list need a unique `key` prop?**  
The key helps React identify the correct item when a list is added to, removed from, or changed.

**6. What is conditional rendering? Show one place you used it.**  
Conditional rendering displays different UI for different conditions. The stack panel displays an empty message when no technologies are selected and selected cards otherwise.

**7. How do you pass data from a parent component to a child component, and how does a child send something back to the parent?**  
A parent passes data and functions as props. A child calls the function prop, such as the card's add button calling the parent’s `addToStack` function.
