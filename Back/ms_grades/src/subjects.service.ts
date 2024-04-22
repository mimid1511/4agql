import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from './schemas/subject.schema';
import { CreateSubjectInput } from './dto/create-subject.input';

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>) {}

  create(createSubjectInput: CreateSubjectInput) {
    const createdSubject = new this.subjectModel(createSubjectInput);
    return createdSubject.save();
  }

  findAll() {
    return this.subjectModel.find().exec();
  }

  findOneById(id: string) {
    return this.subjectModel.findById(id).exec();
  }

  remove(id: string) {
    return this.subjectModel.findByIdAndDelete(id).exec();
  }
}