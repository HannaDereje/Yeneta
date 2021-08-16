
class ActivityResultService{

    constructor(activityResultRepository){
        this.activityResultRepository =  activityResultRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
    }

     insert(activityResult){

        return this.activityResultRepository.create(activityResult)
                    
    }
     getAll(){

        const activityResults = this.activityResultRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(activityResults)})
    }

    getOne(id){

        const activityResult = this.activityResultRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(activityResult)})
    }

    updateOne(id, activityResult){

        const a_activityResult = this.activityResultRepository.updateOne(id, activityResult);
        return new Promise((resolve, reject)=>{resolve(a_activityResult)})
    }
    deleteOne(id){

        const deletedactivityResult = this.activityResultRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deletedactivityResult)})
    }
    deleteAll(){

        const deletedactivityResults = this.activityResultRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deletedactivityResults)})
    }

}

module.exports = ActivityResultService
