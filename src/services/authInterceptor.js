const authInterceptor = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  return res.status(403).json({ message: 'Invalid User' });
};

module.exports = authInterceptor;
