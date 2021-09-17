
//"server": "nodemon server.js"
   // "start": "concurrently \"npm run server\" \" cd ../yenetafrontend && npm start\"",
class UserService{

    constructor(userRepository){
        this.userRepository =  userRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.getOneByEmail = this.getOneByEmail.bind(this) 
        this.getOneByToken = this.getOneByToken.bind(this)
        this.getMany = this.getMany.bind(this)
        this.getOneUsername = this.getOneUsername.bind(this)
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
getOneByEmail(email){ 
 
        const oneuser = this.userRepository.getOneByEmail(email); 
        return new Promise((resolve, reject)=>{resolve(oneuser)}) 
    } 
 
    getOneByToken(token){ 
 
        const oneuser = this.userRepository.getOneByToken(token); 
        return new Promise((resolve, reject)=>{resolve(oneuser)}) 
    }

    getMany(emails){
        const users = this.userRepository.getMany(emails);
        return new Promise((resolve, reject)=>{resolve(users)})
    

    }

    
    getOneUsername(username) {
        const users = this.userRepository.getOneUsername(username);
        return new Promise((resolve, reject)=>{resolve(users)})
    }
    updateOne(id, user){

        const a_user = this.userRepository.updateOne(id, user);
        return new Promise((resolve, reject)=>{resolve(a_user)})
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
