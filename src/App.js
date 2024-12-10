import { useState } from "react";

const initialGoals = [
  {
    id: 1,
    goal: "Finishing the notifications functionality",
    category: "Anthropologyca App",
    status: "progressing",
  },
  {
    id: 2,
    goal: "Finishing the image functionalities",
    category: "Anthropologyca App",
    status: "reached",
  },
  {
    id: 3,
    goal: "Starting a new project",
    category: "Anthropologyca App",
    status: "started",
  },
];

export default function App() {
  const [goals, setGoals] = useState(initialGoals);

  function handleSetGoal(goal) {
    setGoals((goals) => [...goals, goal]);
  }

  return (
    <div className=".App">
      <Banner />
      <GoalForm onSetGoal={handleSetGoal} />
      <GoalsList goals={goals} />
      <Footer />
    </div>
  );
}

function Banner() {
  return <h1 className="banner">🚀 React Goals App 💯</h1>;
}

function GoalForm({ onSetGoal }) {
  const [goal, setGoal] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!goal || !category) return;

    const newGoal = {
      id: Math.random() * 999,
      goal,
      category,
      status: "not started",
    };

    onSetGoal(newGoal);
  }

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <label for="goal">📌 What's on your mind today?</label>
      <input
        type="text"
        name="goal"
        placeholder="Add a goal for today"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <label for="category">📂 Category</label>

      <input
        type="text"
        name="category"
        placeholder="Project, Daily tasks, etc.."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input className="button" type="submit" value="Set Goal" />
    </form>
  );
}

function GoalsList({ goals }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const [selectedGoal, setSelectedGoal] = useState(null);
  // const categories => derived state or a prop
  const [selectedCategory, setSelectedCategory] = useState(
    "Anthropologyca Project"
  );

  function handleSelectCategory(category) {
    setSelectedCategory(category);
  }

  const selectedGoal = {
    id: 3,
    goal: "Starting a new project",
    category: "Anthropologyca App",
    status: "started",
    startedAt: Date.now(),
    finishedAt: Date.now(),
  };

  const categories = ["Anthropologyca Project", "Daily habits", "Fitness"];

  return (
    <main>
      <div className="left-sidebar">
        <h1 onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
          <span>{isCollapsed ? "📁 " : "📂 "}</span>
          Categories
        </h1>
        <ul className="categories">
          {categories.map((cat) => (
            <li
              className="selected-goal"
              onClick={(e) => handleSelectCategory(cat)}
            >
              {selectedCategory === cat ? "📂 " : "📁 "}
              {cat}
            </li>
          ))}
        </ul>
      </div>
      {!isCollapsed && (
        <div className="goals">
          <ul>
            {goals.map((goal) => (
              <Goal goal={goal} />
            ))}
          </ul>
        </div>
      )}

      {!isCollapsed && selectedGoal && (
        <div className="right-sidebar">
          <h3>{selectedGoal?.goal}</h3>
          <ul>
            <li>📍 Started at: {selectedGoal?.startedAt}</li>
            <li>🚩Reached at: {selectedGoal?.startedAt}</li>
            <li>⏳ Duration : XX days and</li>
          </ul>
        </div>
      )}
    </main>
  );
}

function Goal({ goal }) {
  return (
    <li>
      <span>
        {goal.status === "started"
          ? "📌"
          : goal.status === "progressing"
          ? "⏳ "
          : "💯"}
      </span>
      {goal.goal}
    </li>
  );
}

function Footer() {
  return <footer className="footer">Made with 💖 by RAWNAQ NAILI ✨</footer>;
}
