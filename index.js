const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

const fetchMetadata = async () => {
  try {
    const uri = process.env.ECS_CONTAINER_METADATA_URI_V4
      || process.env.ECS_CONTAINER_METADATA_URI; // prefer V4, fallback to legacy
    if (!uri) return null;
    const response = await axios.get(uri);
    return response.data;
  } catch (error) {
	  console.error('Error fetching metadata:', error.message);
    return null;
  }
};

app.get('/', async (_req, res) => {
  // Prefer checking for metadata vars, fallback to AWS_REGION
  const inEcs = process.env.ECS_CONTAINER_METADATA_URI_V4
             || process.env.ECS_CONTAINER_METADATA_URI;
  if (inEcs || process.env.AWS_REGION) {
    const metadata = await fetchMetadata();
    res.json({ message: 'Hello World from Fargate! 🏗️', metadata });
    return;
  }
  res.json({ message: 'Hello World from Local! 🏠' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});	
