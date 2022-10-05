import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate } from "class-validator";



export class  UnitOfMeasureDto{
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly name:string;
  
}