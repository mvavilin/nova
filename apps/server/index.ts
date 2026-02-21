import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 10_000;

app.use(cors());
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'server' });
});

app.get('/api/test', (_request, response) => {
  response.json({ message: 'Server is working!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
