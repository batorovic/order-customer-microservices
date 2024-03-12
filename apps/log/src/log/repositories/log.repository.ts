import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from '../entities';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async create(log: Log): Promise<LogDocument> {
    return (await this.logModel.create(log)).toObject();
  }
}
