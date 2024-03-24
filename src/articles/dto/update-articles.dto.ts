import { PartialType } from '@nestjs/mapped-types';
import { CreateArticlesDto } from './create-articles.dto';

export class UpdateArticlesDto extends PartialType(CreateArticlesDto) {}
