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

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      // response.status(400).send({error: "Malformatted id"})
      next(error);
    });
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).send("Success");
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.get(personsURL, (request, response) => {
  Persons.find({}).then((persons) => {
    response.json(persons);
  });
});

app.post(personsURL, (request, response, next) => {
  const body = request.body;

  // if (body.name === undefined || body.phoneNumber === undefined) {
  //   return response.status(400).json({ error: "Name/Phone number missing!" });
  // }

  const person = new Persons({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.delete(`${personsURL}/:id`, (request, response, next) => {
  console.log("In delete function")
  Persons.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).send())
    .catch((error) => next(error));
});

app.put(`${personsURL}/:id`, (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    phoneNumber: body.phoneNumber,
  };
  Persons.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.get(`${personsURL}/:id`, (request, response) => {
  const id = request.params.id;
  Persons.findById(id).then((person) => response.json(person));
});

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
    next(error);
  }
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);
