// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Controller extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    componentContainer:Map<string,any>=new Map<string,any>();
    public static instance:Controller=null;
    onLoad () {
        Controller.instance=this;
        cc.game.addPersistRootNode(this.node);
    }

    pushInContainer<T>(bindingName:string,component:T){
        if(this.componentContainer.has(bindingName)){
            throw new Error("bindingName has repeated: "+bindingName);
        }
        if(bindingName==""||component==null){
            throw new Error("bindingName is empty or component is null!");
        }

        this.componentContainer.set(bindingName,component);
    }

    getComponentFromContainer<T>(bindingName:string):T{
        if(!this.componentContainer.has(bindingName)){
            throw new Error("bindingName cant found: "+bindingName);
        }

        return this.componentContainer.get(bindingName);
    }
}
