
class ActivityAnswerService {

    constructor(activityAnswerRepository) {
        this.activityAnswerRepository = activityAnswerRepository;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.getByActivity = this.getByActivity.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

    insert(activityAnswer) {

        return this.activityAnswerRepository.create(activityAnswer)

    }
    getAll() {

        const activityAnswers = this.activityAnswerRepository.getAll();
        return new Promise((resolve, reject) => { resolve(activityAnswers) })
    }

    getOne(id) {

        const activityAnswer = this.activityAnswerRepository.getOne(id);
        return new Promise((resolve, reject) => { resolve(activityAnswer) })
    }
    getByActivity(id) {

        const activityAnswer = this.activityAnswerRepository.getByActivity(id);
        return new Promise((resolve, reject) => { resolve(activityAnswer) })
    }
    updateOne(id, activityAnswer) {

        const activityAnswer = this.activityAnswerRepository.updateOne(id, activityAnswer);
        return new Promise((resolve, reject) => { resolve(activityAnswer) })
    }
    deleteOne(id) {

        const deletedactivityAnswer = this.activityAnswerRepository.deleteOne(id);
        return new Promise((resolve, reject) => { resolve(deletedactivityAnswer) })
    }
    deleteAll() {

        const deletedactivityAnswers = this.activityAnswerRepository.deleteAll();
        return new Promise((resolve, reject) => { resolve(deletedactivityAnswers) })
    }

}

module.exports = ActivityAnswerService
