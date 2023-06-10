import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
    @ApiProperty({ type: 'string' })
    email: string;
    @ApiProperty()
    jwt: string;
  }
  