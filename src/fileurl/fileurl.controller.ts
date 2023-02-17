import { FileurlService } from './fileurl.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFileUrlDto } from './dto/FileUrlDto';
import { Fileurl } from './schema/Fileurl.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Types } from 'mongoose';

@ApiTags('fileurl')
@Controller('fileurl')
export class FileurlController {
  constructor(private readonly fileurlService: FileurlService) {}

  @Post('create')
  @MessagePattern({ cmd: 'create' })
  @ApiOperation({ summary: 'Create a new fileurl' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async createOne(
    @Body() createFileUrlDto: CreateFileUrlDto,
    @Payload() _createFileUrlDto: CreateFileUrlDto,
  ): Promise<Fileurl> {
    return this.fileurlService.create(createFileUrlDto || _createFileUrlDto);
  }

  @Get(':id')
  @MessagePattern({ cmd: 'get' })
  @ApiOperation({
    summary:
      'Find a fileurl by _id, But You cant execute it. It is reason of adding a @Payload decorator. Swagger is for Rest API, not for microservice, so its misunderstanding it',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  async findOne(
    @Param('id') id: string,
    @Payload() _id: string,
  ): Promise<Fileurl | BadGatewayException> {
    const idValidation = Types.ObjectId.isValid(id || _id);
    if (!idValidation) {
      throw new BadGatewayException('Invalid id');
    }
    const fileurl = this.fileurlService.findOne(id || _id);
    return fileurl;
  }

  @Get()
  @MessagePattern({ cmd: 'getAll' })
  @ApiOperation({ summary: 'Find all fileurl' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  async findAll(): Promise<Fileurl[]> {
    return this.fileurlService.findAll();
  }

  @Patch('update/:id')
  @MessagePattern({ cmd: 'update' })
  @ApiOperation({ summary: 'Update a fileurl by id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  async updateOne(
    @Param('id') id: string,
    @Body() updateFileUrlDto: CreateFileUrlDto,
  ): Promise<Fileurl | BadGatewayException> {
    const isValidId = Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new BadGatewayException('Invalid id');
    }
    return this.fileurlService.update(id, updateFileUrlDto);
  }
}
