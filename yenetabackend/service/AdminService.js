
class AdminService{

    constructor(adminRepository){
        this.adminRepository =  adminRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

     insert(admin){

        return this.adminRepository.create(admin)
                    
    }
     getAll(){

        const admins = this.adminRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(admins)})
    }

    getOne(id){

        const admin = this.adminRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(admin)})
    }

    updateOne(id, admin){

        const a_admin = this.adminRepository.updateOne(id, admin);
        return new Promise((resolve, reject)=>{resolve(a_admin)})
    }
    deleteOne(id){

        const deletedadmin = this.adminRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deletedadmin)})
    }
    deleteAll(){

        const deletedadmins = this.adminRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deletedadmins)})
    }

}

module.exports = AdminService
