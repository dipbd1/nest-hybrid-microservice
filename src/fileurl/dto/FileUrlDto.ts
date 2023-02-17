import { ApiProperty } from '@nestjs/swagger';

export class CreateFileUrlDto {
  @ApiProperty()
  fileurl: string;

  @ApiProperty()
  item_id: number;

  @ApiProperty()
  module_key: string;

  @ApiProperty()
  app_id: number;

  @ApiProperty()
  business_id: number;

  @ApiProperty()
  image_alt: string;

  @ApiProperty()
  image_title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  updatedBy: string;

  @ApiProperty()
  deletedAt: string;

  @ApiProperty()
  remoteAddr: string;

  @ApiProperty()
  userAgent: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  sort_order: number;

  // @ApiProperty()
  createdAt: Date;

  // @ApiProperty()
  updatedAt: Date;

  // @ApiProperty()
  isDelete: boolean;

  // @ApiProperty()
  isPublish: boolean;

  @ApiProperty()
  hitCount: number;
}

export class findByIdDto {
  @ApiProperty()
  _id: string;
}
