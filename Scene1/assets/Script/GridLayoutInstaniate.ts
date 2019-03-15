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
export class GridLayoutInstaniate extends cc.Component {

    @property(cc.Prefab)
    public gridItem:cc.Prefab=null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for(let index=0;index<6;index++)
        {
            let item=cc.instantiate(this.gridItem);
            this.node.addChild(item);
        }
    }

    // update (dt) {}
}
