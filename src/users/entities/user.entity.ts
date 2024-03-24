import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true, example: 'exemplo@email.com' })
  email: string;
}
