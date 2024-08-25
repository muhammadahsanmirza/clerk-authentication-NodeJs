const express = require("express");
var cors = require('cors')

const { verifyToken } = require("@clerk/clerk-sdk-node");

const app = express();
app.use(cors())

app.post("/protected-route", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedToken = await verifyToken(token);

    // Now, you can use `verifiedToken` to access user data and roles
    res.status(200).json({ message: "Access granted", user: verifiedToken });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
