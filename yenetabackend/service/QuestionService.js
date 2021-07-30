
class QuestionService{

    constructor(questionRepository){
        this.questionRepository =  questionRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

     insert(question){

        return this.questionRepository.create(question)
                    
    }
     getAll(){

        const questions = this.questionRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(questions)})
    }

    getOne(id){

        const aquestion = this.questionRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(aquestion)})
    }

    updateOne(id, question){

        const aquestion = this.questionRepository.updateOne(id, question);
        return new Promise((resolve, reject)=>{resolve(aquestion)})
    }
    deleteOne(id){

        const deletedquestion = this.questionRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deletedquestion)})
    }
    deleteAll(){

        const deletedquestions = this.questionRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deletedquestions)})
    }

}

module.exports = QuestionService
