process.env.NODE_ENV= process.env.NODE_ENV || 'development'
process.env.SERVER_PORT= process.env.SERVER_PORT || '44301'
process.env.JWT_SECRET='0a6b944d-d2fb-46fc-a85e-0295c986cd9f'
// process.env.MONGO_HOST='mongodb://opensuse-azure:AUrD9KCuO1OKiWV0HqZlFFW5qm3bI8FLtbcFMAwOpbFS9EhvwKjgZjoZooL4RxJLTVDrNpbOwn20Wc59eiVq9g==@opensuse-azure.documents.azure.com:10255/mean-dev?ssl=true&sslverifycertificate=false'
// process.env.MONGO_PORT='10255'
process.env.MONGO_HOST='mongodb://localhost'
process.env.MONGO_PORT='27017'
require('babel-register');
require("babel-polyfill");
require('./server');