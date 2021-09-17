
class DiscussionRoomService{

    constructor(discussionRoomRepository){
        this.discussionRoomRepository =  discussionRoomRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.getCount = this.getCount.bind(this)
    }

     insert(discussionRoom){

        return this.discussionRoomRepository.create(discussionRoom)
                    
    }
     getAll(){

        const discussionRooms = this.discussionRoomRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(discussionRooms)})
    }

    getOne(id){

        const discussionRoom = this.discussionRoomRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(discussionRoom)})
    }

    updateOne(id, discussionRoom){

        const a_discussionRoom = this.discussionRoomRepository.updateOne(id, discussionRoom);
        return new Promise((resolve, reject)=>{resolve(a_discussionRoom)})
    }
    deleteOne(id){

        const deleteddiscussionRoom = this.discussionRoomRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deleteddiscussionRoom)})
    }
    deleteAll(){

        const deleteddiscussionRooms = this.discussionRoomRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deleteddiscussionRooms)})
    }
    getCount(){

        const count = this.discussionRoomRepository.getCount();
        return new Promise((resolve, reject)=>{resolve(count)})

    }
}

module.exports = DiscussionRoomService
