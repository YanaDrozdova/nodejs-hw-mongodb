import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseFilterParams from '../utils/filters/parseFilterParams.js';
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

const enableCloudinary = env('ENABLE_CLOUDINARY');

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const { _id: userId } = req.user;

  const data = await contactServices.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.getContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
    // return res.status(404).json({
    //   message: `Contact with id=${id} not found`,
    // });
  }
  res.json({
    status: 200,
    message: `Contact with ID: ${id} successfully found`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (enableCloudinary === 'true') {
      photoUrl = await saveFileToCloudinary(photo, 'photos');
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await contactServices.createContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (enableCloudinary === 'true') {
      photoUrl = await saveFileToCloudinary(photo, 'photos');
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await contactServices.updateContact(
    { _id: id, userId },
    { ...req.body, photo: photoUrl },
  );

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const data = await contactServices.deleteContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, 'Contact with id=${id} not found');
  }

  res.status(204).send();
};
