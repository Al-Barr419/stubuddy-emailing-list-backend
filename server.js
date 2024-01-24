const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001; // Use a different port than your React app
// Middleware to parse JSON body
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello from the back-end!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Endpoint to add contact to SendGrid
app.post("/add-contact", (req, res) => {
  const client = require("@sendgrid/client");
  client.setApiKey(process.env.SENDGRID_API_KEY);

  // Extract user details from request body
  const { email, first_name, last_name } = req.body;

  // Check if the necessary data is present
  if (!email || !first_name || !last_name) {
    return res.status(400).send("Missing required fields");
  }

  list_id = "ed8fdf7f-ab08-44cc-8c34-40437beee930";

  const data = {
    contacts: [
      {
        email,
        first_name,
        last_name,
      },
    ],
    list_ids: [list_id],
  };

  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };

  client
    .request(request)
    .then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
      res.status(200).send("Contact added successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error adding contact");
    });
});

// TO CREATE CONTACT LIST

// const client = require("@sendgrid/client");
// client.setApiKey(process.env.SENDGRID_API_KEY);

// const data = {
//   name: "Mailing List",
// };

// const request = {
//   url: `/v3/marketing/lists`,
//   method: "POST",
//   body: data,
// };

// client
//   .request(request)
//   .then(([response, body]) => {
//     console.log(response.statusCode);
//     console.log(response.body);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// FOR SENDING EMAILS

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: "test@example.com", // Change to your recipient
//   from: "barrajiboye@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
