import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCatDTO } from './dto/cat.dto';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {

  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) { }

  async create(createCatDto: CreateCatDTO): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async getCats(): Promise<Cat[]> {
    const cats = this.catModel.find();
    return cats;
  }

  async getCat(catID: string) {
    const cat = this.catModel.findById(catID)
    return cat;
  }

  async updateCat(catID: string, createCatDto: CreateCatDTO) {
    const updateCat = await this.catModel.findByIdAndUpdate(catID, createCatDto,{new:true});
    return updateCat;
  }

  async deleteCat(catID: string):Promise<Cat> {
    const deleteCat = await this.catModel.findByIdAndDelete(catID);
    return deleteCat;
  }
}
