import express from 'express';
import { documentController } from '../controllers/documentController.js';

const router = express.Router();

// CRUD operations
router.post('/', documentController.createDocument);
router.get('/collection/:collection', documentController.getDocuments);
router.get('/:id', documentController.getDocumentById);
router.put('/:id', documentController.updateDocument);
router.delete('/:id', documentController.deleteDocument);

// Advanced querying
router.post('/collection/:collection/query', documentController.queryDocuments);

export const documentRoutes = router;