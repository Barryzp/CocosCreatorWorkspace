import Tile from "./Tile";
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
export default class MapManager extends cc.Component {

    @property(cc.Node)
    public content: cc.Node = null;
    @property(cc.Prefab)
    public tilePb: cc.Prefab = null;

    public size: number = 0;
    /**
     * testMap:
     * [
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 2],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [3, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
     * 
     * 
     */
    public map =
        [
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        ];
    public tileContainer: Tile[][];

    public startTile: Tile = null;
    public aimTile: Tile = null;

    public static instance: MapManager = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        MapManager.instance = this;
    }

    async start() {
        this.init();
    }

    public init() {
        this.size = this.map.length;
        let width = this.content.getContentSize().width;
        let edge = width / this.size;
        let startPos: cc.Vec2 = cc.v2(-width / 2 + edge / 2, width / 2 - edge / 2);
        this.createMap(edge, startPos);
    }

    public createMap(edge: number, startPos: cc.Vec2) {
        let tempPos: cc.Vec2 = startPos;
        this.tileContainer = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.tileContainer[i] = new Array(this.size);
        }

        for (let i = 0; i < this.size; i++) {
            tempPos = cc.v2(startPos.x, startPos.y - edge * i);
            for (let j = 0; j < this.size; j++) {
                let tileX: number = tempPos.x + j * edge;
                let tileY: number = tempPos.y;
                let tilePos: cc.Vec2 = cc.v2(tileX, tileY);
                let mapPos: cc.Vec2 = cc.v2(i, j);
                this.spawnTile(edge, mapPos, tilePos);
            }
        }
    }

    private spawnTile(edge: number, mapPos: cc.Vec2, tilePos: cc.Vec2) {
        let tile: cc.Node = cc.instantiate(this.tilePb);
        tile.setParent(this.content);
        tile.setPosition(tilePos);
        tile.setContentSize(edge, edge);
        let tileControl: Tile = tile.getComponent(Tile);

        tileControl.initTile(this.map[mapPos.x][mapPos.y], cc.v2(mapPos.y, this.size - mapPos.x - 1));
        this.tileContainer[mapPos.y][this.size - mapPos.x - 1] = tileControl;
    }

    public isBeyondBorder(tile: Tile) {
        return !tile;
    }

    public getTile(x: number, y: number) {
        if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
            return null
        }

        return this.tileContainer[x][y];
    }
}
