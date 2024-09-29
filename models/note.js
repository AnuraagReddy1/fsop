const mongoose = require("mongoose");
require('dotenv').config()

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

const url = process.env.MONGODBURI;

// const password = process.argv[2];

// console.log(password);

// const url = `mongodb+srv://anuraagreddy1:${password}@backend.ok4st.mongodb.net/noteApp?retryWrites=true&w=majority`;

console.log(url);
mongoose.set("strictQuery", false);

// 9DYCPSwjrCpo85fM

// const noteSchema = new mongoose.Schema({
//     content: String,
//     important: Boolean,
//   });
// let Note;
// async function run() {
//     await mongoose.connect(url);
//     Note = mongoose.model("Note", noteSchema);

//     await mongoose.model('User').findOne(); // Works!
//   }

//   run();

mongoose
  .connect(url)
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    console.log(typeof(doc));
    delete ret._id;
  },
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: process.argv[3],
//   important: process.argv[4],
// });

// if (note.content) {
//   note.save().then((result) => {
//     console.log(note);
//     mongoose.connection.close();
//   });
// } else {
//   Note.find({}).then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   });
// }

module.exports = mongoose.model('Note', noteSchema)