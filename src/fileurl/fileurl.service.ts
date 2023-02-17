import { Fileurl, FileurlDocument } from './schema/Fileurl.schema';
import { Injectable } from '@nestjs/common';
import { CreateFileUrlDto } from './dto/FileUrlDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FileurlService {
  constructor(
    @InjectModel(Fileurl.name)
    private fileurlModel: Model<FileurlDocument>,
  ) {}

  async findAll(): Promise<Fileurl[]> {
    return this.fileurlModel.find().exec();
  }

  async create(createFileUrlDto: CreateFileUrlDto): Promise<Fileurl> {
    const createdFileUrl = new this.fileurlModel(createFileUrlDto);
    createFileUrlDto.createdAt = new Date();
    createFileUrlDto.updatedAt = new Date();
    return createdFileUrl.save();
  }

  async findOne(id: string): Promise<Fileurl> {
    const _fileurl = await this.fileurlModel.findById(id).exec();
    if (!_fileurl) return null;
    this.fileurlModel
      .findByIdAndUpdate(id, {
        hitCount: _fileurl.hitCount + 1,
        updatedAt: new Date(),
      })
      .exec();
    return _fileurl;
  }

  async update(
    id: string,
    updateFileUrlDto: CreateFileUrlDto,
  ): Promise<Fileurl> {
    const _fileurl = await this.fileurlModel
      .findByIdAndUpdate(id, updateFileUrlDto, { new: true })
      .exec();
    return _fileurl;
  }
}
