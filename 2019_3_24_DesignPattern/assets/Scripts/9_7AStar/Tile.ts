import MapManager from "./MapManager";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

export enum TileType {
    normal = 0,
    obstacle = 1,
    start = 2,
    aim = 3
}

@ccclass
export default class Tile extends cc.Component {

    public pos: cc.Vec2 = cc.Vec2.ZERO;
    public type: number = 0;
    public preTile:Tile=null;

    //暂时标记是否是斜边
    private _isBevel: boolean = false;
    public get isBevel(): boolean {
        return this._isBevel;
    }
    public set isBevel(value: boolean) {
        this._isBevel = value;
    }

    /**采用整数计算，速度快 */
    public get G(): number {
        let delta:number = 0;
        let parentG = 0;
        if (this.preTile != null) {
            parentG = this.preTile.G;
            delta = this.isBevel ? 14 : 10;
        }

        let val = parentG + delta;
        return val;
    }
    public get H(): number {
        let val = this.getWeight(MapManager.instance.aimTile.pos);
        return val
    }
    public get F(): number {
        return this.G + this.H;
    }

    @property(cc.Label)
    counter:cc.Label=null;

    @property(cc.Label)
    posLabel:cc.Label=null;

    @property(cc.Label)
    gLabel:cc.Label=null;

    @property(cc.Label)
    hLabel:cc.Label=null;


    public get isObstacle() {
        return this.type == TileType.obstacle;
    }

    public initTile(type: number, pos: cc.Vec2) {
        this.type = type;
        switch (type) {
            case TileType.normal:
                break;
            case TileType.obstacle:
                this.node.color = cc.Color.GRAY;
                break;
            case TileType.start:
                this.node.color = cc.Color.RED;
                MapManager.instance.startTile = this;
                break;
            case TileType.aim:
                this.node.color = cc.Color.GREEN;
                MapManager.instance.aimTile = this;
                break;
        }

        this.pos = pos;
        this.posLabel.string = `(${pos.x},${pos.y})`;
    }

    refreshLabel(){
        this.hLabel.string = "H:"+this.H.toString();
        this.gLabel.string = "G:"+this.G.toString();
    }

    setPreTile(tile:Tile){
        this.preTile = tile;
    }

    /**
     * 获取到目标点的权值（曼哈顿距离）
     * @param aim 目标点
     */
    private getWeight(aim: cc.Vec2): number {
        let weight = -1;

        weight = Math.abs(aim.x - this.pos.x) + Math.abs(aim.y - this.pos.y) * 10;
        if (weight < 0) throw new Error("weight has not initialized!");

        return weight;
    }
}
