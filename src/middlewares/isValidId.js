import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const isValidId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(createHttpError(400, `ID ${id} is not valid`));
  }

  next();
};

export default isValidId;
