import { version } from '../../package.json';
import { Router } from 'express';
import facts from './facts';

export default ({ config, db }) => {
	let api = Router();

	// mount the facts resource
	api.use('/facts', facts({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
