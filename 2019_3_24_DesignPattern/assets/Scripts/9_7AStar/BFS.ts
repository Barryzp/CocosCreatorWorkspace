// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Tools } from "../Tools/Tools";
import MapManager from "./MapManager";
import Tile from "./Tile";

const { ccclass, property } = cc._decorator;


/**广度优先寻路算法
 * 和再数据结构中的定义有所不同，现在这个二维数组表示的是地图，而非顶点的定义
 * 那么这个流程应该如何走呢？
 * 
 * 思路是这样的：
 *      从某个点出发，
 *      需要用到队列
 * 
 * 
 */


@ccclass
export default class BFS extends cc.Component {

    /**暂存队列 */
    queue: Tile[] = [];
    public get queueLen() {
        return this.queue.length;
    }
    pushInQueue(tile: Tile) {
        this.queue.push(tile);
    }
    deQueue() {
        return this.queue.shift();
    }

    /**已访问数组 */
    private visited: Tile[] = [];
    /**是否某个点已经被访问过 */
    isPointVisited(point: Tile) {
        let visited = false;
        this.visited.forEach((arrPoint: Tile) => {
            if (this.vec2Equal(point.pos, arrPoint.pos)) {
                visited = true;
            }
        });

        return visited;
    }

    canPointPutInVisited(point: Tile) {
        // 没有超出边界
        if (MapManager.instance.isBeyondBorder(point)) {
            return false;
        }

        // 非障碍物
        if (point.isObstacle) {
            return false;
        }

        // 被访问过
        if (this.isPointVisited(point)) {
            return false;
        }

        return true;
    }

    pushInVisited(point: Tile) {
        this.visited.push(point);
        if (point == MapManager.instance.startTile || point == MapManager.instance.aimTile) {
            return;
        }
        point.node.color = cc.Color.ORANGE;
    }

    getTileByIndex(pos: cc.Vec2, index: number) {
        if (index == 0) {
            return MapManager.instance.getTile(pos.x, pos.y + 1);
        } else if (index == 1) {
            return MapManager.instance.getTile(pos.x + 1, pos.y);
        } else if (index == 2) {
            return MapManager.instance.getTile(pos.x, pos.y - 1);
        } else if (index == 3) {
            return MapManager.instance.getTile(pos.x - 1, pos.y);
        }
    }

    async findPath(start: Tile, aim: Tile) {
        console.log(`${start.pos.toString()} visitting.`);
        this.pushInVisited(start);
        while (this.queueLen > 0) {
            let vert = this.deQueue();
            this.pushInVisited(vert);
            // 如果目的顶点在已访问数组中，代表找到路径
            if (this.isPointVisited(aim)) {
                return;
            }

            /**4个方向去遍历 */
            for (let i = 0; i < 4; i++) {
                const tile = this.getTileByIndex(vert.pos, i);
                if (this.canPointPutInVisited(tile)) {
                    tile.setPreTile(vert);
                    this.pushInQueue(tile);
                }
            }
        }
    }

    vec2Equal(p1: cc.Vec2, p2: cc.Vec2) {
        return p1.x == p2.x && p1.y == p2.y;
    }

    async clickStart() {
        MapManager.instance.startTile.setPreTile(null);
        let startTile = MapManager.instance.startTile;
        let tempTile = MapManager.instance.aimTile;
        let aimTile = MapManager.instance.aimTile;
        this.pushInQueue(startTile);
        this.findPath(startTile, tempTile);

        let tiles = []
        while (tempTile != null) {
            tiles.push(tempTile);
            tempTile = tempTile.preTile;
        }

        for (let i = tiles.length - 1; i >= 0; i--) {
            await Tools.sleep(0.1);
            const tile = tiles[i];
            if (tile == startTile || tile == aimTile) {
                continue;
            }
            tile.node.color = cc.Color.MAGENTA;
        }
    }
}
