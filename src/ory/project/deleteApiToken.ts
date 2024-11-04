const axios = require("axios");
require("dotenv/config");

// Set environment variables
const ORY_PROJECT_ID = process.env.ORY_PROJECT_ID;
const WORKSPACE_API_KEY = process.env.WORKSPACE_API_KEY;

// Get ORY_PROJECT_API_KEY_ID from command line arguments
const ORY_PROJECT_API_KEY_ID = process.argv[2];

if (!ORY_PROJECT_ID || !WORKSPACE_API_KEY || !ORY_PROJECT_API_KEY_ID) {
  throw new Error(
    "ORY_PROJECT_ID, WORKSPACE_API_KEY, and ORY_PROJECT_API_KEY_ID must be set. Provide ORY_PROJECT_API_KEY_ID as a command line argument."
  );
}

// Define an async function to delete an API token for an ORY project
async function deleteOryApiToken() {
  try {
    const response = await axios.delete(
      `https://api.console.ory.sh/projects/${ORY_PROJECT_ID}/tokens/${ORY_PROJECT_API_KEY_ID}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${WORKSPACE_API_KEY}`,
        },
      }
    );

    console.log("API token deleted successfully");
  } catch (error) {
    console.error("Error deleting ORY API token:", error);
  }
}

// Call the function to execute the request
deleteOryApiToken();
