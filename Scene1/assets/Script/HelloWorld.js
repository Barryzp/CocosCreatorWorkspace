cc.Class({

    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },


    // use this for initialization
    onLoad: function () {
        var object1=Object.create(this);

        eval("var temp=10");
        this.temp=10;
        this.label.string = this.text;
        
        console.log('hello world.')
    },

    // called every frame
    update: function (dt) {

    },
});
