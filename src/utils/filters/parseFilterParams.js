import { contactTypeList } from '../../constants/contacts.js';

const parseFilterParams = ({ type, isFavourite }) => {
  const parsedType = contactTypeList.includes(type) ? type : undefined;
  const parsedIsFavourite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : undefined;
  const filterParams = {};

  if (parsedType !== undefined) {
    filterParams.type = parsedType;
  }
  if (parsedIsFavourite !== undefined) {
    filterParams.isFavourite = parsedIsFavourite;
  }

  return filterParams;
};

export default parseFilterParams;
