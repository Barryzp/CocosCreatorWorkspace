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
export default class BindingManager extends cc.Component {

    private static instance:BindingManager=null;
    public static get Instance(){
        if(!this.instance){
            this.instance=new BindingManager();
        }
        return this.instance;
    }


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        BindingManager.instance=this;
    }

    start () {

    }

    // update (dt) {}

    onDestroy(){
        BindingManager.instance=null;
    }
}
