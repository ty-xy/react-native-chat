import {observable} from 'mobx'

class massageStore {
    @observable messageList = [
        {_id: 'sdghjdsk', name: '小明', chatType: 'me'},
        {_id: 'sdg678sk', name: '小刘', chatType: 'qme'},
        {_id: 'sdghj12sk', name: '小白', chatType: 'me'},   
        {_id: 'sd23ghjdsk', name: '小明', chatType: 'qme'},
        {_id: 'sd21g678sk', name: '小刘', chatType: 'me'},
        {_id: '2sdghj12sk', name: '小白', chatType: 'mqe'},     
        {_id: 'sdghcvjdsk', name: '小明', chatType: 'me'},
        {_id: 'sdg673224f8sk', name: '小刘', chatType: 'mee'},
        {_id: 'sdghj152sk', name: '小白', chatType: 'me'},  
    ]

    getMessageList = (item) => {
        this.messageList = [
            {_id: 'sdghjdsk', name: '小明', chatType: 'Hi，很高心认识你，我是易永平 🙂'},
            {_id: 'sdg678sk', name: '小刘', chatType: '瓜分1000000000红包！快领！复…'},
            {_id: 'sdghj12sk', name: '小白', chatType: '好的， 五分钟后沟通'},   
            {_id: 'sd23ghjdsk', name: '小明', chatType: 'Hi，很高心认识你，我是易永平 🙂'},
            {_id: 'sd21g678sk', name: '小刘', chatType: '瓜分1000000000红包！快领！复…'},
            {_id: '2sdghj12sk', name: '小白', chatType: '好的， 五分钟后沟通'},     
            {_id: 'sdghcvjdsk', name: '小明', chatType: 'Hi，很高心认识你，我是易永平 🙂'},
            {_id: 'sdg673224f8sk', name: '小刘', chatType: '瓜分1000000000红包！快领！复…'},
            {_id: 'sdghj152sk', name: '小白', chatType: '好的， 五分钟后沟通'},  
        ];
    }

    removeListItem = (item) => {
        this.messageList = this.list.filter((l) => {
            return l.index !== item.index
        })
    }
  
}

export default new massageStore()