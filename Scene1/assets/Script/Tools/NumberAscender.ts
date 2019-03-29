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

@ccclass
export default class NumberAscend extends cc.Component {
    public static IsStopAllNumberAscendAsync: boolean = false;

    public static AscendNumberAni(label: cc.Label, number: number, time: number, suffix = "", callbacks = null, isUseAni = true) {
        if (isUseAni) {
            NumberAscend.AscendNumbers(label, number, time, suffix, callbacks);
        }
        else {
            NumberAscend.SetValue(label,number, suffix);
        }
    }

    private static async AscendNumbers(label: cc.Label, total, time, suffix = "", callback = null) {
        let fixedTime = 20;

        let totalTime = time * 1000;
        let loopTimes = totalTime / fixedTime;
        let delta = Math.ceil(total / loopTimes);

        let currentNum = parseInt(label.string);
        total += currentNum;

        if (total > currentNum) {
            while (currentNum < total - 20 && !NumberAscend.IsStopAllNumberAscendAsync) {

                await Tools.Sleep(fixedTime);
                currentNum += Math.ceil(delta * 0.9) + Math.ceil(delta * 0.1 * Math.random());
                NumberAscend.SetValue(label, currentNum, suffix);
            }
            while (currentNum < total && !NumberAscend.IsStopAllNumberAscendAsync) {
                await Tools.Sleep(fixedTime);
                currentNum += 1;
                fixedTime += 5;
                NumberAscend.SetValue(label, currentNum, suffix);
            }
        } else {
            while (currentNum - 20 > total && !NumberAscend.IsStopAllNumberAscendAsync) {
                await Tools.Sleep(fixedTime);
                currentNum += Math.floor(delta * 0.9) + Math.floor(delta * 0.1 * Math.random());
                NumberAscend.SetValue(label, currentNum, suffix);
            }
            while (currentNum > total && !NumberAscend.IsStopAllNumberAscendAsync)
            {
                fixedTime+=20;
                await Tools.Sleep(fixedTime);
                currentNum-=1;
            }
        }
    }

    public static SetValue(label:cc.Label,value:number,suffix='')
    {
        label.string=value+suffix;
    }

}
