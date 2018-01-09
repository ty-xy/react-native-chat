import {observable} from 'mobx'

let index = 0

class chatListStore {
  @observable chatList = [
      {_id: 'sdghjdsk', name: '小明', lastMessage: 'Hi，很高心认识你，我是易永平 🙂'},
      {_id: 'sdg678sk', name: '小刘', lastMessage: '瓜分1000000000红包！快领！复…'},
      {_id: 'sdghj12sk', name: '小白', lastMessage: '好的， 五分钟后沟通'},   
      {_id: 'sd23ghjdsk', name: '小明', lastMessage: 'Hi，很高心认识你，我是易永平 🙂'},
      {_id: 'sd21g678sk', name: '小刘', lastMessage: '瓜分1000000000红包！快领！复…'},
      {_id: '2sdghj12sk', name: '小白', lastMessage: '好的， 五分钟后沟通'},     
      {_id: 'sdghcvjdsk', name: '小明', lastMessage: 'Hi，很高心认识你，我是易永平 🙂'},
      {_id: 'sdg673224f8sk', name: '小刘', lastMessage: '瓜分1000000000红包！快领！复…'},
      {_id: 'sdghj152sk', name: '小白', lastMessage: '好的， 五分钟后沟通'},    
  ]

  addListItem = (item) => {
    this.chatList.push({
      name: item, 
      items: [],
      index
    })
    index++
  }

  removeListItem = (item) => {
    this.chatList = this.list.filter((l) => {
      return l.index !== item.index
    })
  }
  addItem = (item, name) => {
    this.chatList.forEach((l) => {
      if (l.index === item.index) {
        l.items.push(name)
      }
    })
  }
}

export default new chatListStore()