import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '../../../common/dto/response.dto';

class LoginResponse {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
  @ApiProperty()
  expiry: string;
}

export class LoginResponseDto implements ResponseDto<LoginResponse> {
  success: boolean;
  data: LoginResponse;
  statusCode: number;
  message: string;
}
