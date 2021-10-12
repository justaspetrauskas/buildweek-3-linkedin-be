export const regError = (err, req, res, next) => {
  if (err.status >= 400 || err.status < 500) {
    const errors = err[0] ? err[0].map((x) => x.msg).join() : err.message;
    res.status(err.status).send({ message: errors });
  } else {
    next(err);
  }
};

export const generError = (err, req, res, next) => {
  res.status(500).send({ message: "Generic server Error!" });
};
