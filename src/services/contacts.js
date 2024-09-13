import ContactCollection from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();
  const count = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData({
    count,
    perPage,
    page,
  });

  return {
    contacts,
    ...paginationData,
  };
};

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

export const deleteContact = (contactId) =>
  ContactCollection.findByIdAndDelete(contactId);
