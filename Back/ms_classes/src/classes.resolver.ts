import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassesService } from './classes.service';
import { Class } from './schemas/class.schema';
import { CreateClassInput } from './dto/create-class.input';
import { UpdateClassInput } from './dto/update-class.input';

@Resolver(() => Class)
export class ClassesResolver {
  constructor(private readonly classesService: ClassesService) {}

  @Mutation(() => Class)
  createClass(@Args('createClassInput') createClassInput: CreateClassInput) {
    return this.classesService.create(createClassInput);
  }

  @Query(() => [Class], { name: 'classes' })
  findAll() {
    return this.classesService.findAll();
  }

  @Query(() => Class, { name: 'class' })
  findOne(@Args('_id') id: string) {
    return this.classesService.findOneById(id);
  }

  @Query(() => Class, { name: 'classByUserEmail' })
  findOneByUserEmail(@Args('email') email: string) {
    console.log("========= EMAIL =========");
    return this.classesService.findOneByUserEmail(email);
  }

  @Mutation(() => Class)
  updateClass(@Args('updateClassInput') updateClassInput: UpdateClassInput) {
    return this.classesService.update(updateClassInput._id, updateClassInput);
  }

  @Mutation(() => Class)
  removeClass(@Args('_id') id: string) {
    return this.classesService.remove(id);
  }
}
