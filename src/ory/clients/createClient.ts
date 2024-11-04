const axios = require("axios");
require("dotenv/config");

// Set environment variables
const ORY_PROJECT_API_ENDPOINT = process.env.ORY_PROJECT_API_ENDPOINT;
const ORY_PROJECT_API_KEY = process.env.ORY_PROJECT_API_KEY;

// Get client name from command line arguments
const clientName = process.argv[2];

if (!ORY_PROJECT_API_ENDPOINT || !ORY_PROJECT_API_KEY || !clientName) {
  throw new Error(
    "ORY_PROJECT_API_ENDPOINT, ORY_PROJECT_API_KEY, and client_name must be set. Provide client_name as a command line argument."
  );
}

// Define an async function to create a new client configuration
async function createOryClient() {
  try {
    const clientData = {
      client_name: clientName,
      grant_types: ["authorization_code"],
      redirect_uris: ["http://127.0.0.1:5555/callback"],
      response_types: ["code", "id_token", "refresh_token"],
      scope: "openid offline",
    };

    const response = await axios.post(
      `${ORY_PROJECT_API_ENDPOINT}/admin/clients`,
      clientData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ORY_PROJECT_API_KEY}`,
        },
      }
    );

    console.log("Client created successfully:", response.data);
  } catch (error) {
    console.error("Error creating ORY client:", error);
  }
}

// Call the function to execute the request
createOryClient();
