import { Controller, Get, Post, Body, Param, Delete, Res, Put } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { AppResponse } from 'src/response.base';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) { }
  
  @Post()
    async create(@Res() res, @Body() createTestDto: CreateTestDto) {
      try {
        let data = await this.testService.create(createTestDto)
        return AppResponse.ok(res, data, "Success create test!")
      } catch (e) {
        return AppResponse.badRequest(res, "", e.message)
      }
    }

  @Get()
    async findAll(@Res() res) {
      try {
        let data = await this.testService.findAll();
        return AppResponse.ok(res, data)
      } catch (e) {
        return AppResponse.badRequest(res, "", e.message)
      }
    }

  @Get(':id')
    async findOne(@Res() res, @Param('id') id: string) {
      try {
        let data = await this.testService.findOne(id);
        return AppResponse.ok(res, data)
      } catch (e) {
        return AppResponse.badRequest(res, "", e.message)
      }
    }

  @Put(':id')
    async update(@Res() res, @Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
      try {
        let data = await this.testService.update(id, updateTestDto);
        return AppResponse.ok(res, data, "Test has been updated!")
      } catch (e) {
        return AppResponse.badRequest(res, "", e.message)
      }
    }

  @Delete(':id')
    async remove(@Res() res, @Param('id') id: string) {
      try {
        let data = await this.testService.remove(id);
        return AppResponse.ok(res, "", data)
      } catch (e) {
        return AppResponse.badRequest(res, "", e.message)
      }
    }

}