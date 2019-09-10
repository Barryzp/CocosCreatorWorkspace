//适配器模式：
/**
 * 看看定义：把一个类的接口转化成客户端所期待的另外一种接口，从而使原接口不匹配而无法在一起工作的两个类能够在一起工作？？？
 * 也就是B实现了IB，但是想用IA，但IA是由A实现。
 */
interface IA{
    doAthing();
}
class A implements IA{
    doAthing() {
        console.log("A do Athing.")
    }
}

interface IB{
    doBthing();
}
class B implements IB{
    doBthing() {
        console.log("B do Bthing.")
    }
}

//method1:
class Adapter1 extends A implements IB{
    doBthing() {
        this.doAthing();
    } 
}
//method2:
class Adapter2 implements IB{
    doBthing() {
        this.a.doAthing();
    }
    a:A=new A();
}

//使用
let a:IB=new Adapter1();
a.doBthing();

let b:IB=new Adapter2();
b.doBthing();