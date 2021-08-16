
class ContentManagerService {

    constructor(contentManagerRepository) {
        this.contentManagerRepository = contentManagerRepository;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.getOneByEmail = this.getOneByEmail.bind(this)
    }

    insert(contentManager) {

        return this.contentManagerRepository.create(contentManager)

    }
    getAll() {

        const contentManagers = this.contentManagerRepository.getAll();
        return new Promise((resolve, reject) => { resolve(contentManagers) })
    }

    getOne(id) {

        const contentManager = this.contentManagerRepository.getOne(id);
        return new Promise((resolve, reject) => { resolve(contentManager) })
    }
    getOneByEmail(email) {

        const acontentManager = this.contentManagerRepository.getOneByEmail(email);
        return new Promise((resolve, reject) => { resolve(acontentManager) })
    }
    updateOne(id, contentManager) {

        const contentManager2 = this.contentManagerRepository.updateOne(id, contentManager);
        return new Promise((resolve, reject) => { resolve(contentManager2) })
    }
    deleteOne(id) {

        const deletedcontentManager = this.contentManagerRepository.deleteOne(id);
        return new Promise((resolve, reject) => { resolve(deletedcontentManager) })
    }
    deleteAll() {

        const deletedcontentManagers = this.contentManagerRepository.deleteAll();
        return new Promise((resolve, reject) => { resolve(deletedcontentManagers) })
    }

}

module.exports = ContentManagerService
