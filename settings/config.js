module.exports = {
    db_port: 27017,
    db_name: 'testmongoose',
    db_host: 'localhost',
    db_driver: 'mongodb',
    token_secret: 'topsecretkey!!!!',
    token_expiry_seconds: 30 * 60, // 30 times 60 seconds = 30 minutes
    bcrypt_iterations: 10
}
