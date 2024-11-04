const axios = require("axios");
require("dotenv/config");

// Set environment variables
const WORKSPACE_API_KEY = process.env.WORKSPACE_API_KEY;
const WORKSPACE_ID = process.env.WORKSPACE_ID;

if (!WORKSPACE_API_KEY || !WORKSPACE_ID) {
  throw new Error(
    "WORKSPACE_API_KEY and WORKSPACE_ID must be set in environment variables."
  );
}

// Define an async function to create a new ORY project
async function createOryProject() {
  try {
    const projectData = {
      name: "example",
      environment: "dev",
      home_region: "us-west",
      workspace_id: WORKSPACE_ID,
    };

    const response = await axios.post(
      "https://api.console.ory.sh/projects",
      projectData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${WORKSPACE_API_KEY}`,
        },
      }
    );

    console.log("New project created successfully:", response.data);
  } catch (error) {
    console.error("Error creating ORY project:", error);
  }
}

// Call the function to execute the request
createOryProject();
