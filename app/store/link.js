import {observable} from 'mobx'
import pinyin from 'pinyin'

let index = 0
let  pinyinData
let  sortedData
let t
class dataListStore {
  @observable dataList = [
  {key:"A"},
  {key: "刀白凤",url:'../image/oval.png'},
  {key:"丁春秋",url:'../image/oval.png'},
 {key:"马夫人",url:'../image/oval.png'},
 {key:"马五德",url:'../image/oval.png'},
 {key:"小翠" ,url:'../image/oval.png'}, 
 {key:"于光豪",url:'../image/oval.png'},
 {key:"巴天石",url:'../image/oval.png'},
 {key:"不平道人"},
 {key:"邓百川"},
 {key:"风波恶"},
 {key:"甘宝宝"},
 {key:"公冶乾"},
 {key:"木婉清"},
 {key:"包不同"},
 {key:"天狼子"},
 {key:"太皇太后"},
 {key:"王语嫣"},
 {key:"乌老大"},
 {key:"无崖"},
 {key:"云岛主"},
 {key:"云中鹤"},
 {key:"止清"},
 {key:"白世镜"},
 {key:"天山童姥"},
 {key:"本参"},
 {key: "本观"},
 {key:"出尘子"},
 {key:"冯阿三"},
 {key:"古笃诚"},
 {key:"少林老僧"},
 {key:"过彦之"},
 {key:"兰剑"},
 {key:"平婆婆"},
 {key:"石清露"},
 {key:"石嫂"},
 {key:"司空玄"},
 {key:"司马林"},
 {key:"玄慈"},
 {key:"玄寂"},
 {key:"玄苦"},
 {key:"玄难"},
 {key:"叶二娘"},
 {key:"左子穆"},
 {key:"李春来"},
 {key:"李傀儡"},
 {key:"李秋水"},
 {key: '中国'},  
  ]
// 建议将汉字的拼音持久化存储起来。
 pinyinData = this.dataList.map(han => ({
    key: han.key,
    url:'../image/oval.png',
    num:'176 1158 1111',
    pinyin:  pinyin(han.key, {
            style: pinyin.STYLE_FIRST_LETTER,
        },
        )[0][0], // 可以自行选择不同的生成拼音方案和风格。
  }));
 sortedData =this.pinyinData.sort((a, b) => {
    return a.pinyin.localeCompare(b.pinyin);
  }).map((d) =>d.pinyin)
//   console.log(pinyinData,sortedData)
  t= this.pinyinData.forEach((d, i, data) => {
    d.showType = false;
    if (i) {
        const prev = data[i - 1];
        d.showType = d.pinyin !== prev.pinyin;
    } else {
        d.showType = true;
    }
  });
};

export default new dataListStore()