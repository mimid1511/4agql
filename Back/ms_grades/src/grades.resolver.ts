import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GradesService } from './grades.service';
import { CreateGradeInput } from './dto/create-grade.input';
import { UpdateGradeInput } from './dto/update-grade.input';
import { Grade } from './schemas/grade.schema';

@Resolver(() => Grade)
export class GradesResolver {
  constructor(private readonly gradesService: GradesService) {}

  @Mutation(() => Grade)
  createGrade(@Args('createGradeInput') createGradeInput: CreateGradeInput) {
    console.log(createGradeInput);
    return this.gradesService.create(createGradeInput);
  }

  @Query(() => [Grade], { name: 'grades' })
  findAll() {
    return this.gradesService.findAll();
  }

  @Query(() => Grade, { name: 'grade' })
  findOne(@Args('_id') id: string) {
    return this.gradesService.findOneById(id);
  }

  @Mutation(() => Grade)
  updateGrade(@Args('updateGradeInput') updateGradeInput: UpdateGradeInput) {
    return this.gradesService.update(updateGradeInput._id, updateGradeInput);
  }

  @Mutation(() => Grade)
  removeGrade(@Args('_id') id: string) {
    return this.gradesService.remove(id);
  }

  @Query(() => [Grade])
  getGradesOfUser(@Args('_id') id: string) {
    return this.gradesService.getGradesOfUser(id);
  }
}
