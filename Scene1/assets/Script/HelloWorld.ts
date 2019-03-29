
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    start () {
        console.log(this.node.children[0].activeInHierarchy);
        console.log(this.node.children[0].active);
        
    }

    // update (dt) {}
}
