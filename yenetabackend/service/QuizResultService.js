
class QuizResultService {

    constructor(quizResultRepository) {
        this.quizResultRepository = quizResultRepository;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.getOneByQuizId = this.getOneByQuizId.bind(this)
    }

    insert(quizResult) {

        return this.quizResultRepository.create(quizResult)

    }
    getAll() {

        const quizResults = this.quizResultRepository.getAll();
        return new Promise((resolve, reject) => { resolve(quizResults) })
    }

    getOneByQuizId(id) {
     
        const quizResults = this.quizResultRepository.getOneByQuizId(id);
        return new Promise((resolve, reject) => { resolve(quizResults) })
    }

    getOne(id) {

        const quizResult = this.quizResultRepository.getOne(id);
        return new Promise((resolve, reject) => { resolve(quizResult) })
    }

    updateOne(id, quizResult) {

        const quizResult2 = this.quizResultRepository.updateOne(id, quizResult);
        return new Promise((resolve, reject) => { resolve(quizResult2) })
    }
    deleteOne(id) {

        const deletedquizResult = this.quizResultRepository.deleteOne(id);
        return new Promise((resolve, reject) => { resolve(deletedquizResult) })
    }
    deleteAll() {

        const deletedquizResults = this.quizResultRepository.deleteAll();
        return new Promise((resolve, reject) => { resolve(deletedquizResults) })
    }

}

module.exports = QuizResultService
