
class QuizService {

    constructor(quizRepository) {
        this.quizRepository = quizRepository;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

    insert(quiz) {

        return this.quizRepository.create(quiz)

    }
    getAll() {

        const quizs = this.quizRepository.getAll();
        return new Promise((resolve, reject) => { resolve(quizs) })
    }

    getOne(id) {

        const quiz = this.quizRepository.getOne(id);
        return new Promise((resolve, reject) => { resolve(quiz) })
    }

    updateOne(id, quiz) {

        const quiz2 = this.quizRepository.updateOne(id, quiz);
        return new Promise((resolve, reject) => { resolve(quiz2) })
    }
    deleteOne(id) {

        const deletedquiz = this.quizRepository.deleteOne(id);
        return new Promise((resolve, reject) => { resolve(deletedquiz) })
    }
    deleteAll() {

        const deletedquizs = this.quizRepository.deleteAll();
        return new Promise((resolve, reject) => { resolve(deletedquizs) })
    }

}

module.exports = QuizService
