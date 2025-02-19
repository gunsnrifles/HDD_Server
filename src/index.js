import express from 'express';
import { connectDB } from './config/database.js';
import { documentRoutes } from './routes/documentRoutes.js';
import { config } from './utils/config.js';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/documents', documentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to database and start server
connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
});