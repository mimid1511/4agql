import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassInput } from './dto/create-class.input';
import { UpdateClassInput } from './dto/update-class.input';
import { Class } from './schemas/class.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) 
    private classModel: Model<Class>
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
