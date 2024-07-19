import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';

@Global()
@Module({
  controllers:[RedisController],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const redis = require('redis');
        const client = redis.createClient({
          host: '127.0.0.1',  
          port: 6379,         
        });

        client.on('error', (err) => console.error('Redis error', err));
        // client.on(console.log("This is redis"));

        return client;
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
