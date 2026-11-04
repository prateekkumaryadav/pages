// React exposes these objects globally because React is loaded from a CDN.
const { useState } = React;

/**
 * Describes one task in the application.
 *
 * This is only documentation for learners. JavaScript does not require us
 * to declare a type, but this shape makes the data easier to understand.
 *
 * @property {number} id A unique identifier used by React for list rendering.
 * @property {string} title The text displayed for the task.
 * @property {boolean} completed Whether the task is finished.
 */

// Starter data gives the application useful content on its first load.
const initialTasks = [
  { id: 1, title: "Learn what a React component is", completed: true },
  { id: 2, title: "Practice passing props", completed: false },
  { id: 3, title: "Build a small project", completed: false },
];

/**
 * Displays one task and lets the user mark it complete or remove it.
 *
 * This component demonstrates:
 * - Props: values and functions passed from the parent component.
 * - Event handlers: functions called after a user interaction.
 * - Conditional class names: styling changes when a task is complete.
 *
 * @param {Object} props Values supplied by the parent component.
 * @param {Object} props.task The task to display.
 * @param {Function} props.onToggleComplete Parent callback for changing completion.
 * @param {Function} props.onDelete Parent callback for removing the task.
 * @returns {JSX.Element} The visual representation of one task.
 */
function TaskItem({ task, onToggleComplete, onDelete }) {
  // This event flow starts in the checkbox and calls the parent callback.
  function handleCheckboxChange() {
    onToggleComplete(task.id);
  }

  // This event flow starts in the delete button and calls the parent callback.
  function handleDeleteClick() {
    onDelete(task.id);
  }

  return (
    <li className={`task-item ${task.completed ? "task-item--completed" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleCheckboxChange}
          aria-label={`Mark "${task.title}" as complete`}
        />
        <span>{task.title}</span>
      </label>

      <button
        className="button button--danger button--small"
        type="button"
        onClick={handleDeleteClick}
        aria-label={`Delete "${task.title}"`}
      >
        Delete
      </button>
    </li>
  );
}

/**
 * Displays the task list or an empty-state message.
 *
 * @param {Object} props Values supplied by the parent component.
 * @param {Array<Object>} props.tasks Tasks currently visible after filtering.
 * @param {Function} props.onToggleComplete Callback passed to each TaskItem.
 * @param {Function} props.onDelete Callback passed to each TaskItem.
 * @returns {JSX.Element} A list of tasks or an empty message.
 */
function TaskList({ tasks, onToggleComplete, onDelete }) {
  // Conditional rendering chooses which UI to show based on the array length.
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks match this view yet.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

/**
 * Provides the form used to create a new task.
 *
 * @param {Object} props Values supplied by the parent component.
 * @param {Function} props.onAddTask Parent callback for adding a task.
 * @returns {JSX.Element} A controlled form.
 */
function AddTaskForm({ onAddTask }) {
  // Form input is controlled by React, so its value is always in state.
  const [taskTitle, setTaskTitle] = useState("");

  /**
   * Updates state whenever the learner types in the input.
   *
   * @param {Object} event Browser input event containing the current value.
   */
  function handleInputChange(event) {
    setTaskTitle(event.target.value);
  }

  /**
   * Stops the browser from refreshing and sends valid text to the parent.
   *
   * @param {Object} event Browser submit event.
   */
  function handleSubmit(event) {
    event.preventDefault();

    // trim removes accidental spaces; invalid input is not sent to the parent.
    const cleanedTitle = taskTitle.trim();
    if (!cleanedTitle) {
      return;
    }

    onAddTask(cleanedTitle);
    setTaskTitle("");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label htmlFor="new-task">Add a task</label>
      <div className="form-row">
        <input
          id="new-task"
          type="text"
          value={taskTitle}
          onChange={handleInputChange}
          placeholder="e.g. Learn about useState"
        />
        <button className="button button--primary" type="submit">
          Add task
        </button>
      </div>
    </form>
  );
}

/**
 * The top-level component owns shared state and coordinates child components.
 *
 * Keeping task state here means TaskItem and AddTaskForm can communicate
 * through callbacks without directly changing each other's data.
 *
 * @returns {JSX.Element} The complete application screen.
 */
function App() {
  // State changes trigger React to render the UI again with the new values.
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  /**
   * Creates a new task and adds it to the existing task array.
   *
   * The spread operator copies the old array because state should be treated
   * as immutable rather than changed directly with methods like push().
   *
   * @param {string} title Text entered in AddTaskForm.
   */
  function handleAddTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  /**
   * Toggles one task between complete and incomplete.
   *
   * @param {number} taskId Identifier of the task to update.
   */
  function handleToggleComplete(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  /**
   * Removes one task from state by keeping every other task.
   *
   * @param {number} taskId Identifier of the task to remove.
   */
  function handleDeleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  // Derived values are calculated from state instead of stored separately.
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }
    if (filter === "completed") {
      return task.completed;
    }
    return true;
  });
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">React learning project</p>
        <h1>My task tracker</h1>
        <p>
          Add tasks, complete them, and explore the commented code to see how
          React components, props, state, and events work together.
        </p>
      </section>

      <section className="card" aria-labelledby="task-section-title">
        <div className="section-heading">
          <div>
            <h2 id="task-section-title">Your tasks</h2>
            <p>
              {completedCount} of {tasks.length} task
              {tasks.length === 1 ? "" : "s"} completed
            </p>
          </div>
          <span className="task-count" aria-label={`${tasks.length} total tasks`}>
            {tasks.length}
          </span>
        </div>

        <AddTaskForm onAddTask={handleAddTask} />

        <div className="filter-bar" aria-label="Task filters">
          {["all", "active", "completed"].map((filterOption) => (
            <button
              key={filterOption}
              className={`filter-button ${
                filter === filterOption ? "filter-button--selected" : ""
              }`}
              type="button"
              onClick={() => setFilter(filterOption)}
            >
              {filterOption[0].toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        <TaskList
          tasks={visibleTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </section>

      <footer className="learning-note">
        <strong>Learning tip:</strong> Open <code>app.jsx</code> and follow the
        event flow from a button click to the state update.
      </footer>
    </main>
  );
}

// ReactDOM creates the root connection between React and the HTML element.
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering starts the component tree; App then renders all child components.
root.render(<App />);
