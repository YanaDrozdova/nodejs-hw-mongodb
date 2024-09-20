import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../middlewares/isValidId.js';

import * as contactControllers from '../controllers/contacts.js';
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(contactControllers.getAllContactsController));

router.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactControllers.getContactByIdController),
);

router.post(
  '/',
  validateBody(contactsAddSchema),
  ctrlWrapper(contactControllers.createContactController),
);

router.patch(
  '/:id',
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(contactControllers.patchContactController),
);

router.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactControllers.deleteContactController),
);

export default router;
