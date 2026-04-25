import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello Express + TypeScript!");
});

function randomHumanName(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let name = "";

  for (let i = 0; i < length; i++) {
    name += chars[Math.floor(Math.random() * chars.length)];
  }

  return name.charAt(0).toUpperCase() + name.slice(1);
}

app.get("/api/v1/health", (_req, res) => {
  const data = new Array(10000).fill(0).map((_, index) => {
    return {
      id: index + 1,
      name: randomHumanName(Math.floor(Math.random() * 7) + 5),
      age: Math.floor(Math.random() * 60) + 18,
    };
  });
  res.json({ data });
});

const users = [
  { id: 1, name: "John Doe", age: 30 },
  { id: 2, name: "Jane Smith", age: 25 },
  { id: 3, name: "Alice Johnson", age: 28 },
];

app.get("/api/v1/users", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = startIndex + Number(limit);
  const paginatedUsers = users.slice(startIndex, endIndex);

  res.json({ data: paginatedUsers });
});

app.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({
    data: user,
  });
});

app.post("/api/v1/users", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: "Name and age are required" });
  }
  const newUser = {
    id: users.length + 1,
    name,
    age,
  };
  users.push(newUser);

  res.status(201).json({ data: newUser });
});

app.patch("/api/v1/users/:id", (req, res) => {
  const { name, age } = req.body;
  const { id } = req.params;
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (name) user.name = name;
  if (age) user.age = age;

  return res.json({ data: user });
});

app.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === Number(id));
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  const user = users.splice(userIndex, 1);
  res.json({ data: user });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
