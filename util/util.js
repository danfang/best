var moment = require('moment');
var spawn = require('child_process').spawn;

exports.processArgv = function(argv) {
	var choice = {};
	if (!argv || argv === '-w') {
		choice.date = moment().subtract(7, 'days').format('YYYY-MM-DD');
		choice.description = 'week';
	} else if (argv === '-d') {
		choice.date = moment().subtract(1, 'days').format('YYYY-MM-DD');
		choice.description = 'day';
	} else if (argv === '-m') {
		choice.date = moment().subtract(1, 'months').format('YYYY-MM-DD');
		choice.description = 'month';
	} else {
		choice.date = moment().subtract(1, 'years').format('YYYY-MM-DD');
		choice.description = 'year';
	}
	return choice;
};

exports.handleError = function(err) {
	console.log(err);
	process.exit();
};

exports.repoInfo = function(repo, choice) {
	console.log('Top repo this ' + choice.description + ': ' + repo.full_name);
	if (repo.language) console.log('\tLanguage: ' + repo.language);
	console.log('\tSize: ' + repo.size/1000 + ' MB');
	console.log('\tStars: ' + repo.stargazers_count);
	console.log('\tDescription: ' + repo.description);
};

exports.clone = function(repo) {
	var clone = spawn('git', ['clone', repo.clone_url]);
	clone.stdout.setEncoding('utf8');
	clone.stderr.setEncoding('utf8');
	clone.stdout.on('data', function(data) {
	    console.log(data.toString());
	});
	clone.stderr.on('data', function(data) {
		console.log(data.toString());
	});
	clone.on('exit', function(code) {
		process.exit(code);
	});
}