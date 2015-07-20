var db = require('./index.js');

module.exports = {
	save: function(userObject) {
		db.User.findOrCreate({
			where: {
				email: userObject.email
			},
			defaults: {
	      first_name: userObject.first_name,
	      last_name: userObject.last_name,
        fb_id: userObject.fb_id
	    }
    })
    .then(function(results) {
    	return results;

    })

    .catch(function() {
      throw new Error('Unknown error at method user save()');
    });
	}
};