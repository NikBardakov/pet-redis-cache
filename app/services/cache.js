var redis =require('redis');

const redisClient = redis.createClient({url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`});
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

module.exports = redisClient