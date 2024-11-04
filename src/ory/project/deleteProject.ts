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

// Define an async function to delete an ORY project
async function deleteOryProject() {
  try {
    const response = await axios.delete(
      `https://api.console.ory.sh/projects/${ORY_PROJECT_ID}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${WORKSPACE_API_KEY}`,
        },
      }
    );

    console.log("Project deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting ORY project:", error);
  }
}

// Call the function to execute the request
deleteOryProject();
