
class StudentService {

    constructor(studentRepository) {
        this.studentRepository = studentRepository;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

    async insert(student) {

        return this.studentRepository.create(student)

    }
    getAll() {

        const students = this.studentRepository.getAll();
        return new Promise((resolve, reject) => { resolve(students) })
    }

    getOne(id) {

        const student = this.studentRepository.getOne(id);
        return new Promise((resolve, reject) => { resolve(student) })
    }

    updateOne(id, student) {

        const student2 = this.studentRepository.updateOne(id, student);
        return new Promise((resolve, reject) => { resolve(student2) })
    }
    deleteOne(id) {

        const deletedstudent = this.studentRepository.deleteOne(id);
        return new Promise((resolve, reject) => { resolve(deletedstudent) })
    }
    deleteAll() {

        const deletedstudents = this.studentRepository.deleteAll();
        return new Promise((resolve, reject) => { resolve(deletedstudents) })
    }

}

module.exports = StudentService
