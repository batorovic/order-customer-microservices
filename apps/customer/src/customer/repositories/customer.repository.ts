import {
  PAGINATION_DEFAULT_VALUES,
  PaginationSortByValues,
  PaginationType,
  SORT_ORDER,
} from '@batuhan_kutluay-case/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument, CustomerType } from '../entities';
import { GetAllCustomers } from '../types';

@Injectable()
export class CustomerRepository {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {}

  async create(customer: CustomerType): Promise<CustomerDocument> {
    return (await this.customerModel.create(customer)).toObject();
  }

  async update(id: string, customer: Partial<CustomerType>): Promise<CustomerDocument | null> {
    return this.customerModel
      .findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            ...(customer.name && { name: customer.name }),
            ...(customer.email && { email: customer.email }),
            ...(customer.address && {
              'address.city': customer.address.city,
              'address.country': customer.address.country,
              'address.cityCode': customer.address.cityCode,
              'address.addressLine': customer.address.addressLine,
            }),
          },
        },
        { new: true },
      )
      .lean()
      .exec();
  }

  async getCustomerById(id: string): Promise<CustomerDocument | null> {
    return this.customerModel.findById({ _id: id }).lean().exec();
  }

  async delete(id: string): Promise<CustomerDocument | null> {
    return this.customerModel.findByIdAndDelete({ _id: id }).lean().exec();
  }

  async findAll(pagination: PaginationType): Promise<GetAllCustomers> {
    const {
      limit = PAGINATION_DEFAULT_VALUES.LIMIT,
      skip = PAGINATION_DEFAULT_VALUES.SKIP,
      sort = SORT_ORDER.ASC,
      sortBy = PaginationSortByValues.CREATED_AT,
    } = pagination;

    // filter ve select kısmı silebilirim daha sonra oylesine ekledim
    // const filter = { createdAt: { $gt: new Date('2024-02-08') } };

    const [findQuery, count] = await Promise.all([
      this.customerModel
        // .find(filter)
        .find()
        .sort({ [sortBy]: sort })
        .skip(skip)
        .limit(limit)
        // .select('name email')
        .lean()
        .exec(),
      this.customerModel.countDocuments(),
    ]);

    return {
      data: findQuery,
      count,
    };
  }
}
