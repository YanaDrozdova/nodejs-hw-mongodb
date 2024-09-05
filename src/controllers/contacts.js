import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const data = await contactServices.getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);

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
  const contact = await contactServices.createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await contactServices.updateContact({ _id: id }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};
