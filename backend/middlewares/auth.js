// (Optional) Authentication middleware

const auth = (req, res, next) => {
  // Auth logic here
  next();
};

export default auth;
