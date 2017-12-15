import { Router } from 'express';

export default () => {
	let routes = Router();

  routes.use(function (req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
    } else {
      res.locals.user = null;
    }
    next();
  });

	return routes;
}
