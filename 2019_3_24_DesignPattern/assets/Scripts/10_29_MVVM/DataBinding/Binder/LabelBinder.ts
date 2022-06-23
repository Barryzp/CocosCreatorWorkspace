const {ccclass, property,requireComponent} = cc._decorator;

@ccclass
@requireComponent(cc.Label)
export default class LabelBinder extends cc.Component {

    @property({
        tooltip:"绑定路径，注意：不能重复"
    })
    path:string="";
    @property(cc.String)
    formatStr:string="";

    private label:cc.Label=null;
    
    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
