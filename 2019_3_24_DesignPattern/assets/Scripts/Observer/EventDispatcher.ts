import { Observer } from "./Observer";

export class EventDispatcher{
    private static listener={};

    public static AddListener(name:string,callback:Function,context:any)
    {
        let observers:Observer[]=EventDispatcher.listener[name];
        if(!observers)
        {
            EventDispatcher.listener[name]=[];
        }
        EventDispatcher.listener[name].push(new Observer(callback,context));
    }

    public static RemoveListener(name:string,context:any)
    {
        let observers:Observer[]=EventDispatcher.listener[name];
        if(!observers)return;
        let length = observers.length;

        for(let index=0;index<length;index++)
        {
            if(observers[index].Compare(context))
            {
                observers.splice(index,1);
                break;
            }
        }

        //如果这个事件对应的容器为空了，那么就删除这个容器（通过删除属性的方式进行）
        if(observers.length==0)
        {
            delete EventDispatcher.listener[name];
        }
    }

    public static RemoveAllListener()
    {
        EventDispatcher.listener={};
    }

    //响应事件
    public static Fire(name:string,...args:any[])
    {
        let observers:Observer[]=EventDispatcher.listener[name];
        if(!observers)
        {
            console.log(name+"此事件无订阅者！");
        }
        let length = observers.length;
        for(let index=0;index<length;index++)
        {
            observers[index].OnNotified(...args);
        }
    }
}
