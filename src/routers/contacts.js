import { Router } from 'express';
import {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:id', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactController));

router.patch('/:id', ctrlWrapper(patchContactController));

export default router;
