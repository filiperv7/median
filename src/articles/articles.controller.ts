import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticlesDto } from './dto/create-articles.dto';
import { UpdateArticlesDto } from './dto/update-articles.dto';
import { ArticlesEntity } from './entities/articles.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticlesEntity })
  async create(@Body() createArticlesDto: CreateArticlesDto) {
    return await this.articlesService.create(createArticlesDto);
  }

  @Get()
  @ApiOkResponse({ type: ArticlesEntity, isArray: true })
  async findAll() {
    return this.articlesService.findAll();
  }

  @Get('/published')
  @ApiOkResponse({ type: ArticlesEntity, isArray: true })
  async findPublished() {
    return this.articlesService.findPublished();
  }

  @Get('/drafts')
  @ApiOkResponse({ type: ArticlesEntity, isArray: true })
  async findDrafts() {
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticlesEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.articlesService.findOne(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: err,
        },
      );
    }
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticlesEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticlesDto: UpdateArticlesDto,
  ) {
    return this.articlesService.update(id, updateArticlesDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticlesEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.remove(id);
  }
}
