import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { DatabaseModule } from 'src/database/database.module';
import { CommentsRouter } from './comment.router';

@Module({
  imports: [DatabaseModule],
  providers: [CommentsService, CommentsRouter],
})
export class CommentsModule {}
