import BindingEvent from "./BindingEvent";
const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class BindableComponent extends cc.Component implements INotifyPropertyChanged {

    private bindingEvent: BindingEvent = new BindingEvent();
    public addPropertyChangedEvent(propertyName:string,callback:Function){
        this.bindingEvent.add(propertyName,callback);
    }
    public removePropertyChangedEvent(propertyName:string){
        this.bindingEvent.remove(propertyName);
    }

    protected notifyPropertyChanged(propertyName:string){
        this.bindingEvent.call(this,propertyName);
    }

    protected notifyAllPropertiesChanged(){
        this.notifyPropertyChanged(null);
    }

    protected setProperty<T>(value:T,propertyName:string){
        if(!this[propertyName])throw new Error(`there is not a property named ${propertyName} !`);
        if(this[propertyName]===value){
            //如果属性和字段值相等就不更新  
            return false;
        }

        this[propertyName]=value;
        this.notifyPropertyChanged(propertyName);
        return true;
    }
}
