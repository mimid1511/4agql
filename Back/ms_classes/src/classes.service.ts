import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassInput } from './dto/create-class.input';
import { UpdateClassInput } from './dto/update-class.input';
import { Class } from './schemas/class.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { getUserByEmailQuery } from 'queries/queries';


@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) 
    private classModel: Model<Class>,
    private readonly httpService: HttpService
  ) {}


  async create(createClassInput: CreateClassInput) {
    const createdClasse = new this.classModel(createClassInput);
    const result = await createdClasse.save();
    return result;
  }

  async findAll() {
    const classes = await this.classModel.find().exec();
    return classes;
  }

  async findOneById(id: string) {
    const classe = await this.classModel.findById(id).exec();
    if (!classe) {
      throw new NotFoundException(`Class #${id} not found`);
    }
    return classe;
  }

  async findOneByUserEmail(email: string) {
    const response = await firstValueFrom(
      this.httpService.post(process.env.MS_USERS, {
        query: getUserByEmailQuery(email)
      })
    );
    if (!response || !response.data || !response.data.data || !response.data.data.userByEmail) {
      throw new Error(`User with email ${email} not found`);
    }
    const user = response.data.data.userByEmail;
    const userId = user._id;
    const classe = await this.classModel.findOne({ studentIds: { $in: [userId] } }).exec();
    if (!classe) {
      throw new Error(`User with email ${email} has no class.`);
  }
    return classe;
  }

  async update(id: string, updateClassInput: UpdateClassInput) {
    const classe = await this.classModel.findByIdAndUpdate(id, updateClassInput, { new: true }).exec();
    if (!classe) {
      throw new NotFoundException(`Class #${id} not found`);
    }
    return classe;
  }

  async remove(id: string) {
    const classe = await this.classModel.findByIdAndDelete(id);
    if (!classe) {
      throw new NotFoundException(`Class #${id} not found`);
    }
    return classe;
  }
}
