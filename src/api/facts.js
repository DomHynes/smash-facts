import resource from 'resource-router-middleware';
import facts from '../models/facts';
import characters from '../models/characters';
import _ from 'lodash';

export default () => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'fact',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	index( req, res ) {
		const defaultSettings = {
			games: 'ssbm',
			characters: '',
			count: 10
		};
		const options = _.merge({}, defaultSettings, req.query);
      facts.find({}, {_id: 0})
      .limit(options.count)
      .populate('submitted_by', {name: 1, _id: 0})
      .populate('games', {_id: 0, characters: 0})
      .populate('characters', {_id: 0})
      .exec()
			.then( facts => {
				//filters to only respond with facts that have requested characters
				const characters = options.characters.split(',');
				let resp = [];
				if ( characters.every( char => char.length > 0 )) {
          resp = facts.filter(
            fact => fact.characters.filter(
              char => characters.includes(char.name)
            ).length > 0
          );
				} else {
					resp = facts;
				}


				res.json({ facts: resp });
			})
	}
});
