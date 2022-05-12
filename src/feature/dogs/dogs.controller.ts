import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { FileUplaodDto } from './dto/file-upload.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@ApiBearerAuth()
@ApiTags('dogs🐕')
@Controller('dogs')
export class DogsController {
  constructor(private readonly DogsService: DogsService) {}

  @ApiOperation({
    summary: 'Create a Dog 🐕',
  })
  @ApiBody({
    description: 'Details of Dog 🐕',
    type: CreateDogDto,
  })
  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.DogsService.create(createDogDto);
  }

  @ApiOperation({
    summary: 'Find all Dogs 🐕',
  })
  @Get()
  findAll() {
    return this.DogsService.findAll();
  }

  @ApiOperation({
    summary: 'Find one Dog 🐕',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.DogsService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a Dog 🐕',
  })
  @ApiBody({
    description: 'Details of a Dog 🐕',
    type: UpdateDogDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.DogsService.update(+id, updateDogDto);
  }

  @ApiOperation({
    summary: 'Delete a Dog 🐕',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.DogsService.remove(+id);
  }

  @ApiOperation({
    summary: 'Upload a Dog file 🐕',
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of Dogs',
    type: FileUplaodDto,
  })
  @Post('upload')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file.originalname;
  }
}
