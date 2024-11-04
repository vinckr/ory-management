const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

// Set environment variables
const ORY_PROJECT_ID = process.env.ORY_PROJECT_ID;
const WORKSPACE_API_KEY = process.env.WORKSPACE_API_KEY;

if (!ORY_PROJECT_ID || !WORKSPACE_API_KEY) {
  throw new Error(
    "ORY_PROJECT_ID and WORKSPACE_API_KEY must be set in environment variables."
  );
}

// Define an async function to fetch the project configuration
async function fetchOryProjectConfig() {
  try {
    const response = await axios.get(
      `https://api.console.ory.sh/projects/${ORY_PROJECT_ID}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${WORKSPACE_API_KEY}`,
        },
      }
    );

    // Define the output file path
    const outputPath = path.join(
      "src/ory/config",
      `oryProjectConfig-${ORY_PROJECT_ID}.json`
    );

    // Write the response data to the JSON file
    fs.writeFileSync(outputPath, JSON.stringify(response.data, null, 2));

    console.log(`Your project has been created successfully`);
    console.log(`Configuration saved to ${outputPath}`);
  } catch (error) {
    console.error("Error fetching ORY project configuration:", error);
  }
}

// Call the function to execute the request
fetchOryProjectConfig();
