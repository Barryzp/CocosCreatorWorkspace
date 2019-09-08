import Controller from "./Controller";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property,requireComponent} = cc._decorator;

@ccclass
@requireComponent(cc.Label)
export default class PathGetter extends cc.Component {

    @property
    public bindingName="";
    component:cc.Label=null;
    // onLoad () {}
    start () {
        this.component=this.getComponent(cc.Label);
        Controller.instance.pushInContainer(this.bindingName,this.component);
    }

    onDestroy(){
        Controller.instance.removeComponentFromContainer(this.bindingName);
    }
    // update (dt) {}
}
