
class   ConntentManagerAnswerService{

    constructor(contentManagerAnswerRepository){
        this.contentManagerAnswerRepository =  contentManagerAnswerRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

     insert(contentManagerAnswer){

        return this.contentManagerAnswerRepository.create(contentManagerAnswer)
                    
    }
     getAll(){

        const contentManagerAnswers = this.contentManagerAnswerRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(contentManagerAnswers)})
    }

    getOne(id){

        const contentManagerAnswer = this.contentManagerAnswerRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(contentManagerAnswer)})
    }

    updateOne(id, contentManagerAnswer){

        const contentManagerAnswer = this.contentManagerAnswerRepository.updateOne(id, contentManagerAnswer);
        return new Promise((resolve, reject)=>{resolve(contentManagerAnswer)})
    }
    deleteOne(id){

        const deletedcontentManagerAnswer = this.contentManagerAnswerRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deletedcontentManagerAnswer)})
    }
    deleteAll(){

        const deletedcontentManagerAnswers = this.contentManagerAnswerRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deletedcontentManagerAnswers)})
    }

}

module.exports = ConntentManagerAnswerService
