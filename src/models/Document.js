import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  // Store any JSON data
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  
  // Collection name is now at the root level for better querying
  collection: {
    type: String,
    required: true,
    trim: true,
    index: true // Add index for faster queries
  },
  metadata: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
}, {
  strict: false, // Allows for flexible schema
  minimize: false // Stores empty objects
});

// Update timestamp before saving
documentSchema.pre('save', function(next) {
  this.metadata.updatedAt = new Date();
  next();
});

export const Document = mongoose.model('Document', documentSchema);