import { Router } from 'express';
import {
  getAllContactsController,
  getStudentByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:id', ctrlWrapper(getStudentByIdController));

export default router;
