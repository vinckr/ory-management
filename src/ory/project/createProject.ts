const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

// Set environment variables
const WORKSPACE_API_KEY = process.env.WORKSPACE_API_KEY;
const WORKSPACE_ID = process.env.WORKSPACE_ID;

if (!WORKSPACE_API_KEY || !WORKSPACE_ID) {
  throw new Error(
    "WORKSPACE_API_KEY and WORKSPACE_ID must be set in environment variables."
  );
}

// Get CLI arguments
const [, , projectName, environment, homeRegion] = process.argv;

if (!projectName || !environment || !homeRegion) {
  throw new Error(
    "Please provide name, environment (dev, stage, prod), and homeRegion as arguments."
  );
}

// Define an async function to create a new ORY project
async function createOryProject() {
  try {
    const projectData = {
      name: projectName,
      environment,
      home_region: homeRegion,
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

    // Get ORY_PROJECT_ID from the response data
    const ORY_PROJECT_ID = response.data.id;

    // Define the output file path
    const outputPath = path.join(
      "src/ory/config",
      `${projectData.environment}_${projectData.name}_${ORY_PROJECT_ID}.json`
    );

    // Write the response data to the JSON file
    fs.writeFileSync(outputPath, JSON.stringify(response.data, null, 2));

    console.log("New project created successfully:", response.data);
  } catch (error) {
    console.error("Error creating ORY project:", error);
  }
}

// Call the function to execute the request
createOryProject();
