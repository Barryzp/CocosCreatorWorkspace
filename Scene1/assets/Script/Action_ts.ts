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
export class Action_ts extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    //这个静态变量就只是归类所有了，可以直接在导出来的类中去引用它
    static staticNumber:number=9;

    private static instance:Action_ts=null;
    public static get Instance()
    {
        return Action_ts.instance;
    }

    onLoad () {
        Action_ts.instance=this;

        let action=cc.rotateTo(10,2200).easing(cc.easeCubicActionOut());
        let reverse=cc.reverseTime(action);
        this.node.runAction(reverse);
        console.log('hello world.');
    }

    start () {

    }

    // update (dt) {}
    public LogSthInteresting()
    {
        console.log('Alright,I can use git to sync my code,lol!');
        console.log('No,that\'s enough to me.');
    }
}
