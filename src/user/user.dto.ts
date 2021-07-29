import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;
}
