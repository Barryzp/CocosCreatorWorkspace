
export default class BindingEvent{
    private eventList:Map<string,Function>;

    public bindEvent(){
        this.eventList=new Map<string,Function>();
    }

    add(eventName:string,action:Function){
        if(!action)return;
        this.eventList.set(eventName,action);
    }

    remove(eventName:string){
        if(!eventName)return;

        this.eventList.delete(eventName);
    }

    //HACK:通知所有事件变动存在一定问题
    call(thisArg:any,propertyName:string){
        if(!propertyName){
            this.eventList.forEach(element => element());
            return;
        }

        this.eventList.get(propertyName).call(thisArg);
    }
}