import { documentService } from '../services/documentService.js';

export const documentController = {
  // Create a new document
  createDocument: async (req, res) => {
    try {
      const { collection, data } = req.body;

      console.log(collection)
      
      if (!collection || !data) {
        return res.status(400).json({ 
          message: 'Both collection name and data are required' 
        });
      }

      const document = await documentService.create(collection, data);
      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all documents in a collection
  getDocuments: async (req, res) => {
    try {
      const { collection } = req.params;
      const documents = await documentService.findByCollection(collection);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get document by ID
  getDocumentById: async (req, res) => {
    try {
      const document = await documentService.findById(req.params.id);
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update document by ID
  updateDocument: async (req, res) => {
    try {
      const { data } = req.body;
      
      if (!data) {
        return res.status(400).json({ message: 'Data is required' });
      }

      const document = await documentService.update(req.params.id, data);
      res.json(document);
    } catch (error) {
      if (error.message === 'Document not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  },

  // Delete document by ID
  deleteDocument: async (req, res) => {
    try {
      const document = await documentService.delete(req.params.id);
      
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      
      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Query documents with flexible filters
  queryDocuments: async (req, res) => {
    try {
      const { collection } = req.params;
      const { query = {}, sort = {}, limit = 50, skip = 0 } = req.body;

      const documents = await documentService.query(
        collection,
        query,
        sort,
        limit,
        skip
      );

      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};