const isAdmin = (req, res, next) => {
    if (req.user && req.user.admin_status) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admins only' });
    }
  };
  