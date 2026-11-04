# React Learning Task Tracker

This is a small React app that runs directly on GitHub Pages. It is intentionally
simple and heavily commented so you can follow what React is doing.

## What is in this folder?

- `index.html` loads React, ReactDOM, and Babel from CDNs and provides the
  `root` element where React mounts.
- `app.jsx` contains the React components and application logic.
- `styles.css` contains the visual styles and responsive layout.

There is no `package.json` because this version does not need a local build
step. A browser downloads the libraries when the page loads.

## React concepts demonstrated

### 1. Components

`App`, `TaskList`, `TaskItem`, and `AddTaskForm` are functions that return JSX.
Each component is a reusable piece of the user interface.

### 2. JSX

JSX looks like HTML inside JavaScript. For example:

```jsx
<h1>My task tracker</h1>
```

React converts this JSX into the elements that appear in the browser.

### 3. State with `useState`

`useState` stores values that can change while the user interacts with the
page. When a setter such as `setTasks` runs, React renders the UI again.

### 4. Props

Props are values passed from a parent component to a child component. `App`
passes `task`, `onToggleComplete`, and `onDelete` to each `TaskItem`.

### 5. Events

`onClick`, `onChange`, and `onSubmit` connect browser actions to JavaScript
functions. Follow the callback names in `app.jsx` to trace each event.

### 6. Lists and keys

`tasks.map(...)` creates one `TaskItem` for every task. The `key` prop gives
React a stable identity for each item so it can update the list efficiently.

### 7. Conditional rendering

`TaskList` shows an empty-state message when there are no visible tasks.
The filter logic also demonstrates choosing data based on the current state.

## Run it locally

Because this is a static site, you can open `index.html` directly in a browser.
For a more realistic local server, run one of these commands from this folder
if you already have the tool installed:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish on GitHub Pages

1. Push this folder to a GitHub repository.
2. Open the repository's **Settings** tab.
3. Select **Pages** in the sidebar.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the branch containing this folder and the folder that contains
   `index.html` (use `/root` if `github-pages` is the repository root, or
   configure the repository so this folder is the published site).
6. Save and wait for GitHub to provide the Pages URL.

The asset paths use `./`, so they work when the site is hosted from a project
subpath instead of the domain root.

## Suggested learning exercises

1. Add an edit button to `TaskItem`.
2. Add a task priority field and display it.
3. Save tasks to `localStorage` so they survive a page refresh.
4. Replace the CDN setup with Vite after you are comfortable with the basics.
