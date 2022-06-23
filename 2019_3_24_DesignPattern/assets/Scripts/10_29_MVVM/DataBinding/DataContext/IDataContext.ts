import { IBinding } from "../Binding/IBinding";

export interface IDataContext{
    source:any;
    isBound:boolean;
    bindingList:IBinding[];

    addBinding:(binding:IBinding)=>void;
    removeBinding:(binding:IBinding)=>void;
}