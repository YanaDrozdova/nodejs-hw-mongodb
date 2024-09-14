import { contactTypeList } from '../../constants/contacts.js';

const parseFilterParams = ({ type, isFavourite }) => {
  const parsedType = contactTypeList.includes(type) ? type : contactTypeList[0];
  const parsedIsFavourite =
    typeof isFavourite === 'boolean' ? isFavourite : isFavourite === 'true';

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};

export default parseFilterParams;
