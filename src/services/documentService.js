import { Document } from '../models/Document.js';

export const documentService = {
  create: async (collection, data) => {
    const document = new Document({
      collection,
      data
    });
    return await document.save();
  },

  findByCollection: async (collection) => {
    return await Document.find({ collection });
  },

  findById: async (id) => {
    return await Document.findById(id);
  },

  update: async (id, data) => {
    const document = await Document.findById(id);
    if (!document) {
      throw new Error('Document not found');
    }
    document.data = data;
    return await document.save();
  },

  delete: async (id) => {
    return await Document.findByIdAndDelete(id);
  },

  query: async (collection, query = {}, sort = {}, limit = 50, skip = 0) => {
    const finalQuery = {
      collection,
      ...query
    };

    return await Document.find(finalQuery)
      .sort(sort)
      .limit(Number(limit))
      .skip(Number(skip));
  }
};