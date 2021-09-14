
class MessageService{

    constructor(messageRepository){
        this.messageRepository =  messageRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.getOneAndUpdateLike = this.getOneAndUpdateLike.bind(this)
        this.getOneAndUpdateReport = this.getOneAndUpdateReport.bind(this)
    }

     insert(message){

        return this.messageRepository.create(message)
                    
    }
     getAll(){

        const messages = this.messageRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(messages)})
    }

    getOne(id){

        const amessage = this.messageRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(amessage)})
    }

    getOneAndUpdateLike(id){
        const amessage = this.messageRepository.getOneAndUpdateLike(id);
        return new Promise((resolve, reject)=>{resolve(amessage)})
    }

    getOneAndUpdateReport(id){
     
        const amessage = this.messageRepository.getOneAndUpdateReport(id);
        return new Promise((resolve, reject)=>{resolve(amessage)})
    }

    updateOne(id, message){

        const amessage = this.messageRepository.updateOne(id, message);
        return new Promise((resolve, reject)=>{resolve(amessage)})
    }
    deleteOne(id){

        const deletedmessage = this.messageRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deletedmessage)})
    }
    deleteAll(){

        const deletedmessages = this.messageRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deletedmessages)})
    }

}

module.exports = MessageService
