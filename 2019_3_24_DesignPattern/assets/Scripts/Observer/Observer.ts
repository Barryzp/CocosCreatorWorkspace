
export  class Observer{

    private callback:Function=null;
    private context:any=null;
    constructor(callback,context)
    {
        this.callback=callback;
        this.context=context;
    }

    public OnNotified(...args:any[])
    {
        let self = this;
        this.callback.call(self.context,...args);
    }

    public Compare(context:any):boolean
    {
        return this.context == context;
    }
}
