import axios from "axios";
import React, { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState<{ _id: string; username: string }[]>([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const mefetch = await axios.get("https://mern-deployment-prac-backend.onrender.com/users");
      const { data } = mefetch;
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newUser = await axios.post("https://mern-deployment-prac-backend.onrender.com/add", {
        username,
      });
      setUsername("");
      await fetchUsers();
      console.log(newUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <section>
        {loading
          ? "Loading..."
          : users.map((item) => <div key={item._id}>{item.username}</div>)}
      </section>
      <form onSubmit={handleSubmit}>
        <h1>Add user</h1>
        <label htmlFor="">User</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </main>
  );
}
