const path = require('path');

class Config {
	constructor() {
		this.root = path.normalize(path.join(__dirname, '/..'));
		this.rootPath = process.env.ROOT_PATH || '/';
		this.app = {
			name: 'MongoLeon',
		};
	}
}

module.exports = Config;
