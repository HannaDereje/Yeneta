
class UserService{

    constructor(userRepository){
        this.userRepository =  userRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

     insert(user){

        return this.userRepository.create(user)
                    
    }
     getAll(){

        const users = this.userRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(users)})
    }

    getOne(id){

        const user = this.userRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(user)})
    }

    updateOne(id, user){

        const user = this.userRepository.updateOne(id, user);
        return new Promise((resolve, reject)=>{resolve(topic)})
    }
    deleteOne(id){

        const deleteduser = this.userRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deleteduser)})
    }
    deleteAll(){

        const deletedusers = this.userRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deletedusers)})
    }

}

module.exports = UserService
