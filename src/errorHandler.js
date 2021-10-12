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


// export const notFoundHandler = (err, req, res, next) => {
//   if (err.status === 404) {
//     res.status(err.status).send({ message: err.message || "Not found!" })
//   } else {
//     next(err)
//   }
// }

// export const badRequestHandler = (err, req, res, next) => {
//   if (err.status === 400 || err.name === "ValidationError") {
//     res.status(400).send({ message: err.errors || "Bad Request!" })
//   } else {
//     next(err)
//   }
// }

// export const genericErrorHandler = (err, req, res, next) => {
//   console.log(err)
//   res.status(500).send({ message: "Generic Server Error!" })
// }