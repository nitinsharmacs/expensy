const authInterceptor = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  res.status(403).json({ message: 'Invalid user' });
};

module.exports = authInterceptor;
