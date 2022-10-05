import { IsNotEmpty, IsNumber, IsString,IsBoolean, MaxLength, IsDate } from "class-validator";



export class SystemsDto{
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    readonly name:string;
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly description:string;
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    
    readonly urlDevops:string;
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly project:string;
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly siteUat:string;
    @IsString()
    @MaxLength(500)
    readonly siteProd:string;
    @IsString()
    @MaxLength(500)
    readonly siteQa:string;
    @IsString()
    @MaxLength(500)
    readonly versionNet:string;
    @IsString()
    @MaxLength(500)
    @IsNotEmpty()
    readonly designPatter:string;
    @IsBoolean()
    readonly isInProduction:boolean; 
    @IsString()
    readonly createdDate:Date; 
    @IsString()
    readonly systemType:string; 
}