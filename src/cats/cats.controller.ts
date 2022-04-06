import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus,NotFoundException, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDTO } from './dto/cat.dto';


@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post('create')
  async create(@Res() res, @Body() createCatDto: CreateCatDTO) {
    const createCat = await this.catsService.create(createCatDto);
    return res.status(HttpStatus.OK).json({
      message: 'Cat added successfully',
      createCat
    });
  }

  @Get('/')
  async getCats(@Res() res) {
    const cats = await this.catsService.getCats();
    return res.status(HttpStatus.OK).json({
      cats
    });
  }

  @Get('/:catID')
  async getCat(@Res() res, @Param('catID') catID) {
    const cat = await this.catsService.getCat(catID);
    if (!cat) throw new NotFoundException('Cat does not exist');
    return res.status(HttpStatus.OK).json(cat);
  }

  @Put('/update/:catID')
  async updateCat(@Res() res, @Param('catID') catID: string, @Body() createCatDto: CreateCatDTO) {
    const updatedCat = await this.catsService.updateCat(catID, createCatDto);
    if (!updatedCat) throw new NotFoundException('Cat does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Cat updated successfully',
      updatedCat
    });
  }

  @Delete('/delete/:catID')
  async deleteCat(@Res() res, @Param('catID') catID) {
    const deletedCat = await this.catsService.deleteCat(catID);
    if (!deletedCat) throw new NotFoundException('Cat does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Cat deleted successfully',
      deletedCat
    });
  }
}
