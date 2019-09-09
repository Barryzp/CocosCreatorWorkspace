import Tile, { TileType } from "./Tile";
import MapManager from "./MapManager";
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

const { ccclass, property } = cc._decorator;

@ccclass
export default class AStar extends cc.Component {

    public isDetectAll:boolean = true;

    public counter: number = 0;
    public closedList: Tile[] = [];
    public openedList: Tile[] = [];

    public async gettingStart() {

        //缺少一个循环条件，不管，开冲
        let tile: Tile = MapManager.instance.startTile;
        while (true) {
            if(this.isInClosedList(MapManager.instance.aimTile))break;

            if (this.openedList.length == 0) {
                this.pushInClosedList(tile);
                this.pushAroundInOpenList(tile);
            } else {
                tile = this.getShortTileFromOl();
                //await Tools.sleep(0.5);

                this.pushInClosedList(tile);
                this.removeFromOl(tile);
                this.pushAroundInOpenList(tile);
            }
        }

        let temp:Tile=MapManager.instance.aimTile;
        while(temp){
            temp.node.color=cc.Color.MAGENTA;
            temp=temp.preTile;
        }
    }

    public pushAroundInOpenList(tile: Tile) {
        if (tile.pos.y + 1 < MapManager.instance.size) this.pushInOpenList(MapManager.instance.tileContainer[tile.pos.x][tile.pos.y + 1], tile);//上
        if (tile.pos.x - 1 >= 0) this.pushInOpenList(MapManager.instance.tileContainer[tile.pos.x - 1][tile.pos.y], tile);//左
        if (tile.pos.y - 1 >= 0) this.pushInOpenList(MapManager.instance.tileContainer[tile.pos.x][tile.pos.y - 1], tile);//下
        if (tile.pos.x + 1 < MapManager.instance.size) this.pushInOpenList(MapManager.instance.tileContainer[tile.pos.x + 1][tile.pos.y], tile);//右

        //需要在这个阶段排除一种特殊情况，格子上下左右方有障碍物
        if(!this.isDetectAll)return;
        if (tile.pos.y + 1 < MapManager.instance.size && tile.pos.x - 1 >= 0) {
            //如果tile上方，左方被堵住，应该是进不去的
            let leftTile=MapManager.instance.tileContainer[tile.pos.x - 1][tile.pos.y];
            let upTile=MapManager.instance.tileContainer[tile.pos.x][tile.pos.y + 1];
            if(leftTile.isObstacle&&upTile.isObstacle){}
            else this.pushInOpenList(MapManager.instance.tileContainer[tile.pos.x - 1][tile.pos.y + 1], tile, this.isDetectAll);//左上
        }
        if(tile.pos.x - 1 >= 0&&tile.pos.y - 1 >= 0){
            //如果tile左方，下方被堵住，应该是进不去的
            let leftTile=MapManager.instance.tileContainer[tile.pos.x - 1][tile.pos.y];
            let downTile=MapManager.instance.tileContainer[tile.pos.x][tile.pos.y - 1];
            if(leftTile.isObstacle&&downTile.isObstacle){}
            else this.pushInOpenList(MapManager.instance.tileContainer[tile.pos.x - 1][tile.pos.y-1], tile,this.isDetectAll);//左下
        }
        if(tile.pos.x + 1 <MapManager.instance.size&&tile.pos.y + 1 < MapManager.instance.size){
            //如果tile右方，上方被堵住，应该是进不去的
            let rightTile=MapManager.instance.tileContainer[tile.pos.x+1][tile.pos.y];
            let upTile=MapManager.instance.tileContainer[tile.pos.x][tile.pos.y+1];
            if(rightTile.isObstacle&&upTile.isObstacle){}
            else this.pushInOpenList(MapManager.instance.tileContainer[tile.pos.x+1][tile.pos.y + 1], tile,this.isDetectAll);//右上
        }
        if (tile.pos.y - 1 >= 0 && tile.pos.x + 1 < MapManager.instance.size) {
            //如果tile右方，下方被堵住，应该是进不去的
            let rightTile=MapManager.instance.tileContainer[tile.pos.x+1][tile.pos.y];
            let downTile=MapManager.instance.tileContainer[tile.pos.x][tile.pos.y-1];
            if(rightTile.isObstacle&&downTile.isObstacle){}
            else this.pushInOpenList(MapManager.instance.tileContainer[tile.pos.x + 1][tile.pos.y-1], tile,this.isDetectAll);//右下
        }
    }

    public removeFromOl(tile: Tile) {
        let index = this.openedList.indexOf(tile);
        this.openedList.splice(index, 1);
    }

    public getShortTileFromOl(): Tile {
        let item: Tile = null;
        item = this.openedList.sort((a, b) => {
            return a.F - b.F;
        })[0];
        return item;
    }

    /**
     * 把当前的tile周围的点加入openList
     * @param tile 待加入的点
     * @param current 前驱
     */
    public pushInOpenList(tile: Tile, current: Tile,isBevel=false) {
        //要进行严格地筛选
        if (!tile) return;//无越界
        //非障碍物，且没有在closed列表中
        if (tile.type == TileType.obstacle) return;
        if (this.isInClosedList(tile)) return;

        tile.isBevel = isBevel;
        //设置前驱
        if (!this.isInOpenList(tile)) {
            tile.preTile = current;
            this.openedList.push(tile);
        }else{
            //不应置为正常，只需要比较周围的点与初始点之间的距离
            if(current.G<tile.G){
                tile.preTile=current;
            }
        }
    }

    public pushInClosedList(tile: Tile) {
        console.log("pos: ", tile.pos.x, tile.pos.y)
        tile.counter.string = "" + this.counter++;
        this.closedList.push(tile);
        tile.node.color = cc.Color.ORANGE;
    }

    public isInOpenList(tile: Tile): boolean {
        let item = this.openedList.find((item) => {
            return item == tile;
        })

        return item != null;
    }

    public isInClosedList(tile: Tile): boolean {
        let item = this.closedList.find((item) => {
            return item == tile;
        })

        return item != null;
    }
}
