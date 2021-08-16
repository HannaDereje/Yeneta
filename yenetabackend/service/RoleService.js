
class RoleService {

    constructor(roleRepository) {
        this.roleRepository = roleRepository;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

    insert(role) {

        return this.roleRepository.create(role)

    }
    getAll() {

        const roles = this.roleRepository.getAll();
        return new Promise((resolve, reject) => { resolve(roles) })
    }

    getOne(id) {

        const role = this.roleRepository.getOne(id);
        return new Promise((resolve, reject) => { resolve(role) })
    }

    updateOne(id, role) {

        const role2 = this.roleRepository.updateOne(id, role);
        return new Promise((resolve, reject) => { resolve(role2) })
    }
    deleteOne(id) {

        const deletedrole = this.roleRepository.deleteOne(id);
        return new Promise((resolve, reject) => { resolve(deletedrole) })
    }
    deleteAll() {

        const deletedroles = this.roleRepository.deleteAll();
        return new Promise((resolve, reject) => { resolve(deletedroles) })
    }

}

module.exports = RoleService
