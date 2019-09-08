import Controller from "../ViewModel/Controller";

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
export default class LittleMenu extends cc.Component {


    private _score: number = 0;
    public get score(): number {
        return this._score;
    }
    public set score(value: number) {
        this._score = value;
        if(this.scoreLable==null){
            this.scoreLable=Controller.instance.getComponentFromContainer<cc.Label>("score");
        }
        this.scoreLable.string=this._score.toString();
    }
    private scoreLable:cc.Label=null;
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    // update (dt) {}

    onclick(){
        this.score=Math.random()*100;
    }

    print(){
        console.log(this.score);
    }
}
