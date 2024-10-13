const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODBURI;

// const url = `mongodb+srv://anuraagreddy1:${password}@backend.ok4st.mongodb.net/noteApp?retryWrites=true&w=majority`;

console.log(url);
mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+/.test(v);
      },
    },
  },
});

phoneSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    console.log(typeof doc);
    delete ret._id;
  },
});

const Persons = mongoose.model("Persons", phoneSchema);

// app.get("/info", (request, response) => {
//   const date = new Date();
//   response.send(
//     `<div><p>Phone book has info for ${persons.length} people</p></br><p>${date}</p></div>`
//   );
// });
//

module.exports = mongoose.model("Persons", phoneSchema);
