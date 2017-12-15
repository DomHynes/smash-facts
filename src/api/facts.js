import resource from 'resource-router-middleware';
import facts from '../models/facts';

export default () => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'fact',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	index( req, res ) {
		facts.find({}, {_id: 0})
		.populate('submitted_by', {name: 1, _id: 0})
		.populate('games', {_id: 0, characters: 0})
		.populate('characters', {_id: 0})
		.exec()
			.then( facts => {
				res.json({ facts });
			})
	}
});
