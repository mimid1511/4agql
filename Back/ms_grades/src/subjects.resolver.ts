import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubjectsService } from './subjects.service';
import { Subject } from './schemas/subject.schema';
import { CreateSubjectInput } from './dto/create-subject.input';

@Resolver(() => Subject)
export class SubjectsResolver {
  constructor(private subjectsService: SubjectsService) {}

  @Mutation(() => Subject)
  createSubject(@Args('createSubjectInput') createSubjectInput: CreateSubjectInput) {
    return this.subjectsService.create(createSubjectInput);
  }

  @Query(() => [Subject], { name: 'subjects' })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Query(() => Subject, { name: 'subject' })
  findOne(@Args('_id') id: string) {
    return this.subjectsService.findOneById(id);
  }

  @Mutation(() => Subject) // Add removeSubject resolver
  removeSubject(@Args('_id') id: string) {
    return this.subjectsService.remove(id);
  }
}