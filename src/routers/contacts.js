import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../middlewares/isValidId.js';

import * as contactControllers from '../controllers/contacts.js';
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/contacts.js';
import authenticate from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get(
  '/',
  ctrlWrapper(contactControllers.getAllContactsController),
);

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactControllers.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactsAddSchema),
  ctrlWrapper(contactControllers.createContactController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(contactControllers.patchContactController),
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactsRouter;
