export class Tools {

    public static IsStopFilled: boolean = false;
    public static Sleep(ms, callback = null) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                callback && callback();
            }, ms)
        });
    }

    private static LoadSpriteFrameRes(url: string): Promise<cc.SpriteFrame> {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, cc.SpriteFrame, (err, sf) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(sf);
                }
            })
        });
    }

    public static LoadRes(url: string): Promise<cc.Prefab> {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, cc.Prefab, (err, pb) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(pb);
                }
            })
        });
    }

    public static LoadSpriteFrame(chapter, spriteName: string): Promise<cc.SpriteFrame> {
        chapter = parseInt(chapter) + 1;
        return new Promise((resolve, reject) => {
            resolve(Tools.LoadSpriteFrameRes("/UISprites/LevelUp/shop" + chapter + '/' + spriteName));
        });
    }

    public static async DOFillAmount(sp: cc.Sprite, delta: number, duration: number) {
        let fixedTime = 20;
        let totalTime = duration * 1000;
        let loopTimes = totalTime / fixedTime;
        let currentVal = sp.fillRange;
        let endValue = currentVal + delta;
        let deltaAdd = endValue / loopTimes;
        Tools.IsStopFilled = false;

        let counter = 0;
        while (!Tools.IsStopFilled && currentVal <= endValue) {
            await Tools.Sleep(fixedTime);
            currentVal += deltaAdd;
            sp.fillRange = currentVal;
            if (currentVal >= 1) {
                Tools.IsStopFilled = true;
            }
            console.log('currentVal = ' + currentVal);
        }
    }

    //格式化字符串，填充字符，以及空位数
    /**
    * 将一个数字格式化
    * @param number 要进行填充的数字
    * @param filledChar 填充字符
    * @param vacancyNums 空位数
    */
    public static FormatStr(number, filledChar = '0', vacancyNums = 2) {
        let str: string = '';
        if (number <= 0) {
            for (let index = 0; index < vacancyNums; index++) {
                str += filledChar;
            }
            return str;
        }

        let numberLowVancancy = Math.floor(Math.log(number) / Math.log(10));
        if (numberLowVancancy > vacancyNums) {
            str = numberLowVancancy + '';
            return str;
        } else {
            for (let index = numberLowVancancy + 1; index < vacancyNums; index++) {
                str += filledChar;
            }
        }
        str += number;
        return str;
    }
}