const express = require("express");
const shortid = require("shortid");

let numberOfRequests = 0;
const projects = [];

const server = express();

server.use(express.json());

function logRequests(req, res, next) {
  numberOfRequests += 1;

  console.log(`Number of requests: ${numberOfRequests}`);

  return next();
}

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(el => el.id === id);
  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  req.project = project;

  return next();
}

server.use(logRequests);

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { title } = req.body;

  const project = {
    id: shortid.generate(),
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;

  req.project.title = title;

  return res.json(req.project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id === id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

server.post("/projects/:id/task", checkProjectExists, (req, res) => {
  const { title } = req.body;

  req.project.tasks.push(title);

  return res.json(req.project);
});

server.listen(3030);
