const axios = require("axios");
require("dotenv/config");

// Set environment variables
const ORY_PROJECT_ID = process.env.ORY_PROJECT_ID;
const WORKSPACE_API_KEY = process.env.WORKSPACE_API_KEY;

if (!ORY_PROJECT_ID || !WORKSPACE_API_KEY) {
  throw new Error(
    "ORY_PROJECT_ID and WORKSPACE_API_KEY must be set in environment variables."
  );
}

// Define an async function to create an API token for an ORY project
async function createOryApiToken() {
  try {
    const tokenData = {
      name: "example",
    };

    const response = await axios.post(
      `https://api.console.ory.sh/projects/${ORY_PROJECT_ID}/tokens`,
      tokenData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${WORKSPACE_API_KEY}`,
        },
      }
    );

    console.log("API token created successfully:", response.data);
  } catch (error) {
    console.error("Error creating ORY API token:", error);
  }
}

// Call the function to execute the request
createOryApiToken();
