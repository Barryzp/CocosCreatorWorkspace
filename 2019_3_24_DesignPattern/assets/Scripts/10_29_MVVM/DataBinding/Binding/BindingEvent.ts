
export class Action{
    obj:object;
    name:string
}

export default class BindingEvent{
    private eventList:Action[];

    public bindEvent(){
        this.eventList=new Array<Action>();
    }

    add(action:Action){
        if(!action)return;
        this.eventList.push(action);
    }

    remove(action:Action){
        if(!action)return;

        //记得要扩展库
        this.eventList.remove(action);
    }

}