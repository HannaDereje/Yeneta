
class AdminAnswerService{

    constructor(adminAnswerRepository){
        this.adminAnswerRepository =  adminAnswerRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

     insert(adminAnswer){

        return this.adminAnswerRepository.create(adminAnswer)
                    
    }
     getAll(){

        const adminAnswers = this.adminAnswerRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(adminAnswers)})
    }

    getOne(id){

        const adminAnswer = this.adminAnswerRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(adminAnswer)})
    }

    updateOne(id, adminAnswer){

        const adminAnswer = this.adminAnswerRepository.updateOne(id, adminAnswer);
        return new Promise((resolve, reject)=>{resolve(adminAnswer)})
    }
    deleteOne(id){

        const deletedAdminAnswer = this.adminAnswerRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deletedAdminAnswer)})
    }
    deleteAll(){

        const deletedAdminAnswers = this.adminAnswerRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deletedAdminAnswers)})
    }

}

module.exports = AdminAnswerService
