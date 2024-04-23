import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';
import { Grade } from './schemas/grade.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getAllGradesQuery, getUserQuery } from 'queries/queries';
import { filter } from 'rxjs/operators';
import { groupBy, map } from 'lodash';



@Injectable()
export class GradesService {
  constructor(
    @InjectModel(Grade.name) 
    private gradeModel: Model<Grade>,
    private readonly httpService: HttpService
  ) {}


  async create(createGradeInput: CreateGradeInput) {
    // check if the grade is between 0 and 100
    if (createGradeInput.value < 0 || createGradeInput.value > 100) {
      throw new Error(`La note doit être comprise entre 0 et 100 (actuellement : ${createGradeInput.value})`);
    }

    // check if the users exists
    const ids = [createGradeInput.studentId, createGradeInput.teacherId];
    for (const id of ids) {
      const response = await firstValueFrom(
        this.httpService.post(process.env.MS_USERS, {
          query: getUserQuery(id)
        })
      );
      if (!response || !response.data || !response.data.data || !response.data.data.user) {
        throw new Error(`L'utilisateur avec l'id ${id} n'existe pas`);
      }
    }

    // check if the user with studentId is a student
    const response = await firstValueFrom(
      this.httpService.post(process.env.MS_USERS, {
        query: getUserQuery(createGradeInput.studentId)
      })
    );
    if (response.data.data.user.role !== 'student') {
      throw new Error(`L'utilisateur avec l'id ${createGradeInput.studentId} n'est pas un étudiant (${response.data.data.user.role})`);
    }

    // check if the user with teacherId is a teacher
    const response2 = await firstValueFrom(
      this.httpService.post(process.env.MS_USERS, {
        query: getUserQuery(createGradeInput.teacherId)
      })
    );
    if (response2.data.data.user.role !== 'teacher') {
      throw new Error(`L'utilisateur avec l'id ${createGradeInput.teacherId} n'est pas un professeur (${response2.data.data.user.role})`);
    }

    const createdGrade = new this.gradeModel(createGradeInput);
    const result = await createdGrade.save();
    return result;
  }
  

  async findAll() {
    const grades = await this.gradeModel.find().exec();
    return grades;
  }

  async findOneById(id: string) {
    const grade = await this.gradeModel.findById(id).exec();
    if (!grade) {
      throw new NotFoundException(`Grade #${id} not found`);
    }
    return grade;
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

  async getGradesOfUser(id: string) {
    console.log(id);
    console.log(process.env.MS_GRADES);
    const response = await firstValueFrom(
      this.httpService.post(process.env.MS_GRADES, {
        query: getAllGradesQuery()
      })
    );
    console.log("========= DATA ==========");
    console.log(response.data.data.grades);
    console.log("===================");
    const grades = response.data.data.grades.filter(grade => grade.studentId === id);
    console.log("========= DATA FILTER ==========");
    console.log(grades);
    console.log("===================");
    return grades;
  }

}
