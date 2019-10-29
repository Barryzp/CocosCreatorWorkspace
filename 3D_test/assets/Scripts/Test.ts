const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    public foo:number=13;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // this.fun(10);

        let wordlMatrix=cc.mat4();
        this.node.getWorldMatrix(wordlMatrix)
        console.log("worldMatrix: "+wordlMatrix)

        let localMatrix=cc.mat4();
        this.node.getLocalMatrix(localMatrix);
        console.log("localMatrix: "+localMatrix)
    }

    fun(param){
        console.log("arguments: "+arguments[0])
        let foo=14;
        let fun2=()=>{
            return ()=>{ console.log("foo = "+foo);}
        }
        return fun2
    }

    // update (dt) {}
}
