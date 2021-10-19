module.exports = {    
    MONGO_URI: process.env.MONGO_URI || 'mongodb://host.docker.internal:27017/order',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'MytodoModoJWTKey123!',
    LISTEN_PORT: process.env.LISTEN_PORT || 3000
  };