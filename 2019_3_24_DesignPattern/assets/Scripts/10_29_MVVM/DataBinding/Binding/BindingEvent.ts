
export default class BindingEvent{
    private eventList:Function[];

    public bindEvent(){
        this.eventList=new Array();
    }

    add(action:Function){
        if(!action)return;
        this.eventList.push(action);
    }

    remove(action:Function){
        if(!action)return;

        //记得要扩展库
        this.eventList.remove(action);
    }

    call(thisArg:any,propertyName:string){
        this.eventList.forEach(item=>{
            item.call(thisArg,propertyName);
        })
    }
}