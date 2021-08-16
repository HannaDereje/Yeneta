
class StudentQuestionService {

    constructor(studentQuestionRepository) {
        this.studentQuestionRepository = studentQuestionRepository;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

    insert(studentQuestion) {

        return this.studentQuestionRepository.create(studentQuestion)

    }
    getAll() {

        const studentQuestions = this.studentQuestionRepository.getAll();
        return new Promise((resolve, reject) => { resolve(studentQuestions) })
    }

    getOne(id) {

        const studentQuestion = this.studentQuestionRepository.getOne(id);
        return new Promise((resolve, reject) => { resolve(studentQuestion) })
    }

    updateOne(id, studentQuestion) {

        const studentQuestion2 = this.studentQuestionRepository.updateOne(id, studentQuestion);
        return new Promise((resolve, reject) => { resolve(studentQuestion2) })
    }
    deleteOne(id) {

        const deletedstudentQuestion = this.studentQuestionRepository.deleteOne(id);
        return new Promise((resolve, reject) => { resolve(deletedstudentQuestion) })
    }
    deleteAll() {

        const deletedstudentQuestions = this.studentQuestionRepository.deleteAll();
        return new Promise((resolve, reject) => { resolve(deletedstudentQuestions) })
    }

}

module.exports = StudentQuestionService
