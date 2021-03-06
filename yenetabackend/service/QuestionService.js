
class QuestionService{

    constructor(questionRepository){
        this.questionRepository =  questionRepository;     
        this.insert = this.insert.bind(this);
        this.insertMany = this.insertMany.bind(this)
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.getRandom = this.getRandom.bind(this)
        this.getMany = this.getMany.bind(this)
    }

     insert(question){

        return this.questionRepository.create(question)
                    
    }

    insertMany(questions) {
        return this.questionRepository.insertMany(questions)
    }

    getRandom() {
        return this.questionRepository.getRandom()
    }
     getAll(){

        const questions = this.questionRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(questions)})
    }

    getMany(ids){

        const questions = this.questionRepository.getMany(ids);
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
