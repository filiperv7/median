import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticlesDto } from './dto/create-articles.dto';
import { GetArticlesDto } from './dto/get-articles.dto';
import { UpdateArticlesDto } from './dto/update-articles.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async create(createArticlesDto: CreateArticlesDto): Promise<GetArticlesDto> {
    const article = await this.prisma.article.create({
      data: createArticlesDto,
    });

    return article;
  }

  async findAll() {
    const articles = await this.prisma.article.findMany();

    return articles;
  }

  async findPublished() {
    const articles = await this.prisma.article.findMany({
      where: { published: true },
    });

    return articles;
  }

  async findDrafts() {
    const articles = await this.prisma.article.findMany({
      where: { published: false },
    });

    return articles;
  }

  async findOne(id: number) {
    const article = this.prisma.article.findUnique({ where: { id } });

    const art = await article.then((art: GetArticlesDto) => {
      return art;
    });
    if (!art) throw new NotFoundException();

    return article;
  }

  async update(id: number, updateArticlesDto: UpdateArticlesDto) {
    const article = this.prisma.article.update({
      where: {
        id,
      },
      data: updateArticlesDto,
    });

    return article;
  }

  async remove(id: number) {
    const article = this.prisma.article.delete({
      where: { id },
    });

    return article;
  }
}
