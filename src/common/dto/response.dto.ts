export interface ResponseDto<T> {
  success: boolean;
  data: T;
  statusCode: number;
  message: string;
}
