import { IBinding } from "./IBinding";

enum BindingMode {
    OneWay = 0,
    TwoWay,
    OneWayToSource
}

enum ControlFlags {
    None = 0,
    ResetSourceValue = 0x01,
    ResetTargetValue = 0x02
}

export class Binding implements IBinding {
    private source: any;
    private sourcePath: string;
    private target: any;
    private targetPath: string;
    private sourcePropertyName: string;

    private mode: BindingMode;
    private _flags: ControlFlags;
    public get flags(): ControlFlags {
        return this._flags;
    }
    public set flags(value: ControlFlags) {
        this._flags = value;
    }

    get isBound() {
        return this.source != null;
    };



    bind(thisArg: any) {
        if (thisArg == null) {
            throw new Error("source is null!");
        }

        if(this.isBound)this.unBind();
        
    }

    unBind() {
    }


}