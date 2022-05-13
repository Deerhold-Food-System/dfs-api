import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  create(createDogDto: CreateDogDto) {
    return createDogDto;
  }

  findAll() {
    return `This action returns all Dogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Dog`;
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return `This action updates a #${id} Dog`;
  }

  remove(id: number) {
    return `This action removes a #${id} Dog`;
  }
}
