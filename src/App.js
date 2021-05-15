import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";

export default function App() {
  const [backgroundList, setBackgroundList] = useState([]);
  const [backgroundInput, setBackgroundInput] = useState("");

  useEffect(() => {
    db.ref().once("value", (snapshot) => setBackgroundList(snapshot.val()));
  });

  const postToDatabase = (e) => {
    e.preventDefault();
    const newPostKey = db.ref().push().key;
    db.ref().update({ [newPostKey]: backgroundInput });
  };

  return (
    <div className="main-wrapper">
      <h1>PRIME!</h1>

      <form onSubmit={postToDatabase}>
        <label>What was your background before Prime?</label>
        <input
          onChange={(e) => setBackgroundInput(e.target.value)}
          placeholder="your background"
          type="text"
          value={backgroundInput}
        />
        <button type="submit">Submit</button>
      </form>

      <div style={{marginTop:"2rem"}}>
        <h2>Background List</h2>
        <ul style={{marginLeft:"1rem"}}>
          {Object.values(backgroundList).map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
