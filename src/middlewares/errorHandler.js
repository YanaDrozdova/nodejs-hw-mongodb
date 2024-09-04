const errorHandler = (error, req, res, next) => {
  const { status = 500, message } = error;
  res.status(status).json({
    status: status,
    message: 'Something went wrong',
    data: message, // конкретне повідомлення про помилку, отримане з об'єкта помилки
  });
};

export default errorHandler;
