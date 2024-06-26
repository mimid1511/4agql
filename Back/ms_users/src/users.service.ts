import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserSchema } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { HttpService } from '@nestjs/axios';



@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private readonly httpService: HttpService
  ) {}


  async create(createUserInput: CreateUserInput): Promise<User> {
    // check role
    if (createUserInput.role !== 'admin' && createUserInput.role !== 'student' && createUserInput.role !== 'teacher') {
      throw new Error(`Le rôle doit être admin, student ou teacher (actuellement : ${createUserInput.role})`);
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const createdUser = new this.userModel({
      ...createUserInput,
      password: hashedPassword,
    });
    
    const result = await createdUser.save();
    return result;
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true }).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
        throw new Error(`User with email ${email} does not exist.`);
    }
    return user;
}

}
