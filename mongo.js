const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

console.log(password)

const url = `mongodb+srv://anuraagreddy1:${password}@backend.ok4st.mongodb.net/?retryWrites=true&w=majority&appName=backend`;

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

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// });

// const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "HTML is easy",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
