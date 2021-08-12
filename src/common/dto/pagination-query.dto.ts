import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  // @Type(() => Number) -- we added 'enableImplicitConversion' to main.ts for covering this
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  offset: number;
}
