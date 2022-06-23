export interface IBinding{
    isBound:boolean;
    bind:(thisArg:any)=>void;
    unBind();
}