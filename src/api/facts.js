import resource from 'resource-router-middleware';
import facts from '../models/facts';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'fact',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let fact = facts.find( fact => fact.id===id ),
			err = fact ? null : 'Not found';
		callback(err, fact);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(facts);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = facts.length.toString(36);
		facts.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ fact }, res) {
		res.json(fact);
	},

	/** PUT /:id - Update a given entity */
	update({ fact, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				fact[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ fact }, res) {
		facts.splice(facts.indexOf(fact), 1);
		res.sendStatus(204);
	}
});
