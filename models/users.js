var db = require('./index.js');

module.exports = {
	save: function(userObject) {
		db.Users.findOrCreate({
			where: {
				FB_Email: userObject.FB_Email
			},
			defaults: {
	      first_name: userObject.first_name,
	      last_name: userObject.last_name
	    }
    })
    .then(function(results) {
    	return results;

    })

    .catch(function() {
      throw new Error('Unknown error at method users save()');
    });
	}
};