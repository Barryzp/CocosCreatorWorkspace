import { EventDispatcher } from "./EventDispatcher";
import { EventName } from "../Enum/EventName";

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
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label1: cc.Label = null;

    @property(cc.Label)
    label2: cc.Label = null;

    @property(cc.Node)
    spriteNode:cc.Node=null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        EventDispatcher.AddListener(EventName.updateUI,this.Label1Update,this);
        EventDispatcher.AddListener(EventName.updateUI,this.Label2Update,this);
        EventDispatcher.AddListener(EventName.updateUI,this.SpriteUpdate,this);
    }
    // update (dt) {}

    public OnUpdateUIClick()
    {
        EventDispatcher.Fire(EventName.updateUI);
    }

    public Label1Update()
    {
        this.label1.string="我是你大爷！";
    }

    public Label2Update()
    {
        this.label2.string="我是你二爷！";
    }

    public SpriteUpdate()
    {
        this.spriteNode.color=cc.Color.BLUE;
    }

}
