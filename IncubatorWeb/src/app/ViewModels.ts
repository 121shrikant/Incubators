import { CompanyStageEnum, CompanyStatusEnum, RoleTypeEnum } from "./Enums";

export interface externalDataModel {
    providerextends: string;
    externalAccessTokenextends: string;
    userNameextends: string;
    fullNameextends: string;
}

export interface CompanyDetails
{
    Id: number;
    CompanyStatus: CompanyStatusEnum;
    CompanyName: string;
    ManagingPartner: string;
    LaunchedYear: number;
    Stage: CompanyStageEnum;
    NumberOfMembers: number;
    WebSite: string;
    Email: string;
    Phone: string;
    Country: string;
    City: string;
    Pincode: number;
    CreatedBy: number;
}
export interface CompanyDetailsVM extends CompanyDetails
{
    StageString: string;
}
export interface LoginDetails
{
    UserName: string;
    Password: string;
}
export interface UserDetails
{
    Id: number;
    UserName: string;
    Password: string;
    RoleType: RoleTypeEnum;
}
export interface UserDetailsVm extends UserDetails
{
    authdata?: string;
}