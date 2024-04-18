import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';
import { Grade } from './schemas/grade.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade.name) 
    private gradeModel: Model<Grade>
  ) {}


  async create(createGradeInput: CreateGradeInput) {
    const createdGrade = new this.gradeModel(createGradeInput);
    const result = await createdGrade.save();
    return result;
  }

  async findAll() {
    const grades = await this.gradeModel.find().exec();
    return grades;
  }

  async findOneById(id: string) {
    const user = await this.gradeModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`Grade #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateGradeInput: UpdateGradeInput) {
    const grade = await this.gradeModel.findByIdAndUpdate(id, updateGradeInput, { new: true }).exec();
    if (!grade) {
      throw new NotFoundException(`Grade #${id} not found`);
    }
    return grade;
  }

  async remove(id: string) {
    const grade = await this.gradeModel.findByIdAndDelete(id);
    if (!grade) {
      throw new NotFoundException(`Grade #${id} not found`);
    }
    return grade;
  }
}
