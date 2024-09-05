import ContactCollection from '../db/models/Contact.js';

export const getAllContacts = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findById(id);

export const createContact = async (payload) => {
  const student = await ContactCollection.create(payload);
  return student;
};

export const updateContact = async (id, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
