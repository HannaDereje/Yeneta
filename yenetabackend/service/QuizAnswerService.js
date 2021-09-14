
class QuizAnswerService {

    constructor(quizAnswerRepository) {
        this.quizAnswerRepository = quizAnswerRepository;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.getByQuiz = this.getByQuiz.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

    insert(quizAnswer) {

        return this.quizAnswerRepository.create(quizAnswer)

    }
    getAll() {

        const quizAnswers = this.quizAnswerRepository.getAll();
        return new Promise((resolve, reject) => { resolve(quizAnswers) })
    }

    getOne(id) {

        const quizAnswer = this.quizAnswerRepository.getOne(id);
        return new Promise((resolve, reject) => { resolve(quizAnswer) })
    }
    getByQuiz(id) {

        const quizAnswer = this.quizAnswerRepository.getByQuiz(id);
        return new Promise((resolve, reject) => { resolve(quizAnswer) })
    }
    updateOne(id, quizAnswer) {

        const a_quizAnswer = this.quizAnswerRepository.updateOne(id, quizAnswer);
        return new Promise((resolve, reject) => { resolve(a_quizAnswer) })
    }
    deleteOne(id) {

        const deletedquizAnswer = this.quizAnswerRepository.deleteOne(id);
        return new Promise((resolve, reject) => { resolve(deletedquizAnswer) })
    }
    deleteAll() {

        const deletedquizAnswers = this.quizAnswerRepository.deleteAll();
        return new Promise((resolve, reject) => { resolve(deletedquizAnswers) })
    }

}

module.exports = QuizAnswerService
