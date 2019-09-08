import NumberAscend from "../Tools/NumberAscender";
import { Tools } from "../Tools/Tools";

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
export default class Main extends cc.Component {

    @property(cc.Label)
    label1: cc.Label = null;

    @property(cc.Label)
    label2:cc.Label=null;

    @property
    text: string = 'hello';

    private counter:number=0;
    
    public testNumber:number=0;
    // LIFE-CYCLE CALLBACKS:

    public async Ascend()
    {
        // NumberAscend.IsContain(this.label1.uuid);
        this.testNumber=100000;
        NumberAscend.IsStopAllNumberAscendAsync=true;
        NumberAscend.AscendNumberAni(this.label1,2000,2,"/1000"+(this.counter++));
        NumberAscend.AscendNumberAni(this.label2,3000,1,"/1000");
    }

    public Clear()
    {
        this.label1.string='0';
        this.label2.string='0';
    }

}
