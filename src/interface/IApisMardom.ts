import { Document } from 'mongoose';

export interface ISystems extends Document
{
    readonly name:string;
    readonly description:string;
    
    readonly urlDevops:string;
    
    readonly project:string;
    
    readonly siteUat:string;
    
    readonly siteProd:string;
    
    readonly siteQa:string;
    
    readonly versionNet:string;
    
    readonly designPatter:string;
    
    readonly isInProduction:boolean; 
    readonly createdDate:string; 
    readonly systemType:string; 
}