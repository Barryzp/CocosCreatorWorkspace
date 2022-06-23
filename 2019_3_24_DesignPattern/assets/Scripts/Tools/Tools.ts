export class Tools{
    /**
     * 等待几秒
     * @param seconds 秒数
     */
    public static async sleep(seconds:number){
        return new Promise((resolve,reject)=>{
            setTimeout(resolve,seconds*1000);
        });
    }
}