import express from "express";
import bcrypt from "bcrypt";
import User from "../models/signup.js";
import table from "../models/table.js";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/auth.js";
import dotenv from "dotenv";
import axios from "axios";
import Fuse from "fuse.js";
import Query from "../models/queries.js";
dotenv.config();
const router = express.Router();
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "User Already exists" });
    }
	const us = await User.findOne({ name });
	if (us) {
		return res.status(400).send({ message: "Username Already exists" });
	}
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password: hashedPassword, email });
    newUser.save();
    return res
      .status(200)
      .send({ message: "User Created Successfully", data: newUser });
  } catch (error) {
    res.status(500).send({ message: "An Error Occurred" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ email });
    if (!data) {
      return res.status(404).send({ message: "Invalid Email" });
    }
    const validPassword = await bcrypt.compare(password, data.password);
    if (!validPassword) {
      return res.status(404).send({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      {
        id: data._id,
        name: data.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    // const dat = new Query({
    //   username: data.name,
    // });
    // dat.save();
    res.status(200).send({ name: data.name, token: token });
  } catch (error) {
    res.status(500).send({ message: "An Error Occurred" });
  }
});
let qu;
let u;
router.post("/query", verifyToken, async (req, res) => {
  try {
    const { sessionId, user, query } = req.body;
    qu = query;
    u = user.name;
    // const username = user.name;
    const mostSimilarQuery = await findMostSimilarQuery(query);
    if (mostSimilarQuery) {
      const dat = 
        [{
          type: "text",
          query: query,
          answer: mostSimilarQuery.answers,
          headers: [],
          data: [],
        }];
      const userQuery = await Query.findOneAndUpdate(
        { username: user.name },
        {
          $push: { queries: dat },
        },
        { upsert: true, new: true }
      );
      return res
        .status(200)
        .send({ type: "text", query: query, answer: mostSimilarQuery.answers });
    }
    const response = await axios.post(
      "https://e868-35-198-210-158.ngrok-free.app/query",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const answer = response.data.answer;
    if (answer.includes("| Function")) {
      const dat = 
        [{
          type: "text",
          query: query,
          answer: [
            "I'm sorry, but I can't generate a table in response to your question.",
          ],
          headers: [],
          data: [],
        }];
      const userQuery = await Query.findOneAndUpdate(
        { username: user.name },
        {
          $push: { queries: dat },
        },
        { upsert: true, new: true }
      );
      return res
        .status(200)
        .send({
          type: "text",
          query: query,
          answer: [
            "I'm sorry, but I can't generate a table in response to your question.",
          ],
        });
    }
    if (/table|list/i.test(query)) {
      if (!isPlainText(answer)) {
        const tableData = processForTable(answer);
        // return res.status(200).send({ type: 'table', query: query, headers: tableData.headers, data: tableData.data });
        if (isValidTable(tableData.headers, tableData.data)) {
          const dat = 
            [{
              type: "table",
              query: query,
              answer: [],
              headers: tableData.headers,
              data: tableData.data,
            }];
          const userQuery = await Query.findOneAndUpdate(
            { username: user.name },
            {
              $push: { queries: { $each: dat } },
            },
            { upsert: true, new: true }
          );
          return res.status(200).send({
            type: "table",
            query: query,
            headers: tableData.headers,
            data: tableData.data,
          });
        }
      }
    }
    const lines = answer.split("\n");
    const dat = 
      [{ type: "text", query: query, answer: lines, headers: [], data: [] }];
    const userQuery = await Query.findOneAndUpdate(
      { username: user.name },
      {
        $push: { queries: dat },
      },
      { upsert: true, new: true }
    );
    return res.status(200).send({ type: "text", query: query, answer: lines });
  } catch (error) {
    const dat =
      [{
        type: "text",
        query: qu,
        answer: [
          "Oops! Something went wrong on our end. Please try again later",
        ],
        headers: [],
        data: [],
      }];
    const userQuery = await Query.findOneAndUpdate(
      { username: u },
      {
        $push: { queries: dat },
      },
      { upsert: true, new: true }
    );
    res
      .status(500)
      .send({
        type: "text",
        query: qu,
        answer: [
          "Oops! Something went wrong on our end. Please try again later",
        ],
      });
    // console.log(error);
  }
});
router.get("/getqueries/:username", async (req, res) => {
	try {
	  const { username } = req.params;
	  const userQuery = await Query.findOne({ username });
	  if (!userQuery) {
		return res.status(404).json({ message: "No queries found for this user." });
	  }
	  res.status(200).json(userQuery.queries);
	} catch (error) {
	  console.error("Error fetching queries:", error);
	  res.status(500).json({ message: "Internal server error" });
	}
  });
function processForTable(answer) {
  const rows = answer.split("\n").filter((row) => row.trim() !== "");
  const headers = rows[0]
    .split("\t")
    .map((header) => header.replace(/['"]+/g, "").trim());
  const data = rows
    .slice(1)
    .map((row) =>
      row.split("\t").map((cell) => cell.replace(/['"]+/g, "").trim())
    );
  return {
    headers,
    data,
  };
}
function isValidTable(headers, data) {
  if (!headers.length || !data.length) return false;
  return data.every((row) => row.length === headers.length);
}
function isPlainText(answer) {
  const lowerCaseAnswer = answer.toLowerCase();
  return (
    lowerCaseAnswer.includes("i'm sorry") ||
    lowerCaseAnswer.includes("i can't generate a table")
  );
}
async function findMostSimilarQuery(userQuery) {
  const queries = await table.find();
  const options = {
    includeScore: true,
    threshold: 0.6,
    keys: ["query"],
  };
  const fuse = new Fuse(queries, options);
  const results = fuse.search(userQuery);
  if (results.length > 0 && results[0].score < 0.7) {
    return results[0].item;
  } else {
    return null;
  }
}
export default router;
