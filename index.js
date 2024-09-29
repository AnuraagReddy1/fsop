const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(express.static("dist"));

require("dotenv").config();
app.use(cors());

const Note = require("./models/note");
const Persons = require("./models/persons");

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

const noteUrl = "/api/notes";
const personsURL = "/api/persons";

app.get(noteUrl, (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.post(noteUrl, (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "Content missing!" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.get(personsURL, (request, response) => {
  Persons.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post(personsURL, (request, response) => {
  const body = request.body;

  if (body.name === undefined || body.phoneNumber === undefined) {
    return response.status(400).json({ error: "Name/Phone number missing!" });
  }

  const person = new Persons({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

// app.get(`${baseUrl}/:id`, (request, response) => {
//   const id = request.params.id;
//   const person = persons.find((person) => person.id === id);
//   if (person) response.json(person);
//   else {
//     response.status(404).end();
//   }
// });

// app.post(baseUrl, (request, response) => {
//   const body = request.body;
//   const person = {
//     id: String(Math.random() * 10000),
//     name: body.name,
//     number: body.number,
//   };
//   console.log(person);
//   if (!persons.find((person) => person.name === body.name)) {
//     if (body.name && body.number) {
//       persons = persons.concat(person);
//       response.send(persons);
//     } else {
//       console.log("No person maan!");
//       response.status(400).send("Name or number missing!");
//     }
//   } else {
//     response.status(400).send("Name already exists");
//   }
//   console.log(persons);
// });

// app.delete(`${baseUrl}/:id`, (request, response) => {
//   const id = request.params.id;
//   let newPersons;
//   if (persons.find((person) => person.id === id)) {
//     newPersons = persons.filter((person) => person.id !== id);
//   } else {
//     response.status(404).end();
//   }
//   console.log("Person Deleted");
//   response.status(204).send(newPersons);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const http = require('http')

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
