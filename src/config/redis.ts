import * as redis from 'redis';


type ConfigRedis = {
  host: string | undefined,
  username: string | undefined,
  port: number,
}

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
} as unknown as ConfigRedis);

client.on('connect', () => {
  console.log('redis-server connected!');
});

client.on('ready', () => {
  console.log('redis-server is ready for use...');
});

client.on('error', (err) => {
  console.log('Error: ' + err);
});

client.on('end', () => {
  console.log('client is disconnected from redis-server');
});

process.on('SIGINT', () => {
  client.quit();
});

client.connect().finally(() => {})

export default client
