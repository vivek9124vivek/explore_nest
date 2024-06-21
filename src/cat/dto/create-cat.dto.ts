// create-cat.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}

// update-cat.dto.ts
