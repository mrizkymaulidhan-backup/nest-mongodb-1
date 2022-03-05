import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Model } from 'mongoose';
import { Test } from './entities/test.entity'
import { InjectModel } from '@nestjs/mongoose';
import { TestTransformer } from './transformers/test.transformer';

@Injectable()
export class TestService {
  constructor(@InjectModel('Test') private TestModel: Model<Test>) { }

  async create(createTestDto: CreateTestDto): Promise<TestTransformer> {
    let data = new this.TestModel(createTestDto)
    return TestTransformer.singleTransform(await data.save())
  }

  async findAll(): Promise<TestTransformer> {
    let data = await this.TestModel.find()

    if (data.length < 1) {
      return []
    }
    return TestTransformer.transform(data)
  }
  
  async findOne(id: string): Promise<TestTransformer> {
    console.log(id)
    let data = await this.TestModel.findById(id)

    if (!data) {
      throw new Error('Data not found!')
    }
    return TestTransformer.singleTransform(data)
  }
    
  async update(id: string, updateTestDto: UpdateTestDto): Promise<TestTransformer> {
    let data = await this.TestModel.findByIdAndUpdate(id, updateTestDto, { 'new': true })
      
    if (!data) {
      throw new Error("Test is not found!")
    }
    return TestTransformer.singleTransform(data)
  }

  async remove(id: string): Promise<String> {
    let data = await this.TestModel.findByIdAndRemove(id)
      
    if (!data) {
      throw new Error("Test is not found!")
    }
    return "Test has been deleted!"
  }
}