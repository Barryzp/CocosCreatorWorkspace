import { Tools } from "./Tools";

// Learn TypeScript:
// - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
// - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
// - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
// - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
// - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
// - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

class Tween{
    public uuid:string;
    public context:any;
    constructor(id:string,ct:any)
    {
        this.uuid=id;
        this.context=ct;
    }

    public async AscendNumbers(total, time, suffix = "", callback = null) {
        let fixedTime = 20;

        let totalTime = time * 1000;
        let loopTimes = totalTime / fixedTime;
        let delta = Math.ceil(total / loopTimes);

        let currentNum = parseInt(this.context.string);
        total += currentNum;

        if (total > currentNum) {
            while (currentNum < total - delta && !NumberAscend.IsStopAllNumberAscendAsync) {

                await Tools.Sleep(fixedTime);
                currentNum += Math.ceil(delta * 0.9) + Math.ceil(delta * 0.1 * Math.random());
                NumberAscend.SetValue(this.context, currentNum, suffix);
            }
            while (currentNum < total && !NumberAscend.IsStopAllNumberAscendAsync) {
                await Tools.Sleep(fixedTime);
                currentNum += 1;
                fixedTime += 2;
                NumberAscend.SetValue(this.context, currentNum, suffix);
            }
        } else {
            while (currentNum - delta > total && !NumberAscend.IsStopAllNumberAscendAsync) {
                await Tools.Sleep(fixedTime);
                currentNum += Math.floor(delta * 0.9) + Math.floor(delta * 0.1 * Math.random());
                NumberAscend.SetValue(this.context, currentNum, suffix);
            }
            while (currentNum > total && !NumberAscend.IsStopAllNumberAscendAsync)
            {
                await Tools.Sleep(fixedTime);
                fixedTime+=2;
                currentNum-=1;
                NumberAscend.SetValue(this.context, currentNum, suffix);
            }
        }

        NumberAscend.SetValue(this.context,total,suffix);

        return callback&&callback();
    }
}

@ccclass
export default class NumberAscend extends cc.Component {
    public static IsStopAllNumberAscendAsync: boolean = false;

    private static tweenSet:Tween[]=[];

    public static AscendNumberAni(label: cc.Label, number: number, time: number, suffix = "", callbacks = null, isUseAni = true) {
        let tween:Tween=new Tween(label.uuid,label);
        tween.AscendNumbers(number,time,suffix,callbacks);
        //NumberAscend.tweenSet.push(tween);
        //NumberAscend.AscendNumbers(label, number, time, suffix, callbacks);
    }

    public static DOKill(label:cc.Label)
    {
        let uuid=label.uuid;
        let index=0;
        let length=NumberAscend.tweenSet.length;
        while(index<length)
        {
            if(NumberAscend.tweenSet[index].uuid==uuid)
            {
                break;
            }
            index++;
        }
        NumberAscend.tweenSet.splice(index,1);
    }

    // public static IsContinue(uuid:string)
    // {
    //     let index=0;
    //     let length=NumberAscend.tweenSet.length;
    //     while(index<length)
    //     {
    //         if(NumberAscend.tweenSet[index].uuid==uuid)
    //         {
    //             return true;
    //         }
    //         index++;
    //     }
    //     return false;
    // }

    public static IsContain(uuid:string):boolean
    {
        let index=0;
        let length=NumberAscend.tweenSet.length;
        while(index<length)
        {
            if(NumberAscend.tweenSet[index].uuid==uuid)
            {
                return true;
            }
            index++;
        }
        return false;
    }



    public static SetValue(label:cc.Label,value:number,suffix='')
    {
        label.string=value+suffix;
    }

}
