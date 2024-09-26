import { SORT_ORDER } from '../constants/index.js';
import ContactCollection from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').eq(filter.type);
  }

  if ('isFavourite' in filter) {
    contactsQuery.where('isFavourite').eq(filter.isFavourite);
  }

  if (filter.userId) {
    contactsQuery.where('userId').eq(filter.userId);
  }

  const count = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData({
    count,
    perPage,
    page,
  });

  return {
    ...paginationData,
    contacts,
  };
};

export const getContact = (filter) => ContactCollection.findOne(filter);

export const createContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const updateContact = async (filter, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, payload, {
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
