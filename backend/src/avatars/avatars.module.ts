import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { AvatarsController } from './avatars.controller';

@Module({
  imports: [],
  controllers: [AvatarsController],
  providers: [AvatarsService],
})
export class AvatarsModule {}