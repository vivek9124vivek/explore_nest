import { Injectable, Inject } from '@nestjs/common';
// import { RedisClient } from 'redis';
import { RedisClient } from 'redis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly client: RedisClient) {}

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const stringValue = JSON.stringify(value);
    if (ttlSeconds) {
      await this.client.set(key, stringValue, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, stringValue);
    }
  }

  async get<T>(key: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) {
          console.error('Error getting data from Redis:', err);
          reject(err);
        } else {
          resolve(result ? JSON.parse(result) : null);
        }
      });
    });
  }
  async checkConnection(): Promise<boolean> {
    try {
      await this.client.ping();
      return true;
    } catch (error) {
      console.error('Redis connection error:', error);
      return false;
    }
  }
}
