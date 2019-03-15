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
export class Async_ts extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    async onLoad () {
        this.PrintPerSecond(1000);
        console.log('sync opearation.');
    }

    // start () {

    // }

    // update (dt) {}

    async PrintPerSecond(time)
    {
        return new Promise(function(resolve,reject){
                setTimeout(()=>{resolve();  
                    console.log('wait one second :async opearation.');
        },time);});
    }
}