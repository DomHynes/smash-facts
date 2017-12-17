import { Router } from 'express';

export default () => {
	let routes = Router();

  routes.use( (req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.user = req.user;
    } else {
      res.locals.user = null;
    }
    next();
  });

  routes.use( (req, res, next) => {
    res.locals.build = process.env.NODE_ENV;
    next();
  })

	return routes;
}
