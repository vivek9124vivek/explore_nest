import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('check-connection')
  async checkConnection(): Promise<{ connected: boolean }> {
    const connected = await this.redisService.checkConnection();
    return { connected };
  }

  @Post('set/:key')
  async setData(@Param('key') key: string, @Body('value') value: any): Promise<string> {
    try {
      await this.redisService.set(key, value);
      return 'Data set successfully';
    } catch (error: any) {
      console.error('Error setting data:', error);
      return 'Error setting data';
    }
  }

  @Get('get/:key')
  async getData(@Param('key') key: string): Promise<any> {
    try {
      return await this.redisService.get(key);
    } catch (error) {
      console.error('Error getting data:', error);
      return 'Error getting data';
    }
  }
  

}

