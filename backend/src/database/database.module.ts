import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Gift } from '../entities/gift.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        synchronize: false,
        logging: true,
        entities: [User, Gift],
        migrations: ['dist/migrations/*.js'],
        migrationsTableName: 'migrations',
      }),
    }),
  ],
})
export class DatabaseModule {}
