import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb+srv://harishrofficial:gunsnrifles@gunsnrifles.mwaow19.mongodb.net/?retryWrites=true&w=majority&appName=gunsnrifles',
  dbName: process.env.DB_NAME || 'diagDB'
};