import { useEffect, useOptimistic, useState, useTransition } from "react";

export default function App() {
  const [_, startTransition] = useTransition();
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [optimisticThoughts, addOptimisticThought] = useOptimistic(
    thoughts,
    (oldThoughts, newThought) => [newThought, ...oldThoughts]
  );

  async function postDeepThought() {
    startTransition(async () => {
      addOptimisticThought(`${newThought} (Loading...)`);
      setNewThought("");

      const response = await fetch("/thoughts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ thought: newThought }),
      });

      if (!response.ok) {
        alert("This thought was not deep enough. Do better.");
        return;
      }

      const { thoughts: newThoughts } = await response.json();
      setThoughts(newThoughts);
    });
  }

  useEffect(() => {
    async function fetchThoughts() {
      const res = await fetch("/thoughts");
      const newThoughts = await res.json();
      setThoughts(newThoughts);
    }

    fetchThoughts();
  }, []);

  function handleNewThoughtSubmit(event) {
    event.preventDefault();
    postDeepThought();
  }

  function handleNewThoughtChange(event) {
    setNewThought(event.target.value);
  }

  return (
    <div className="app">
      <h1>Deep Thoughts</h1>

      <form onSubmit={handleNewThoughtSubmit}>
        <label htmlFor="thought">What's on your mind?</label>
        <textarea
          id="thought"
          name="thought"
          rows="5"
          cols="33"
          value={newThought}
          onChange={handleNewThoughtChange}
        ></textarea>
        <button type="submit">Direct my thoughts into the aether</button>
      </form>

      <ul>
        {optimisticThoughts.map((thought, index) => (
          <li key={`${index}:thought`}>{thought}</li>
        ))}
      </ul>
    </div>
  );
}
