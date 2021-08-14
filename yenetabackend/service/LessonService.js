
class LessonService{

    constructor(lessonRepository){
        this.lessonRepository =  lessonRepository;     
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.getOneByNumber = this.getOneByNumber.bind(this)
    }

     insert(lesson){

        return this.lessonRepository.create(lesson)
                    
    }
     getAll(){

        const lessons = this.lessonRepository.getAll();
        return new Promise((resolve, reject)=>{resolve(lessons)})
    }

    getOne(id){

        const alesson = this.lessonRepository.getOne(id);
        return new Promise((resolve, reject)=>{resolve(alesson)})
    }
getOneByNumber(number){ 
 
        const alesson = this.lessonRepository.getOneByNumber(number); 
        return new Promise((resolve, reject)=>{resolve(alesson)}) 
    }
    updateOne(id, lesson){

        const a_alesson = this.lessonRepository.updateOne(id, lesson);
        return new Promise((resolve, reject)=>{resolve(a_alesson)})
    }
    deleteOne(id){

        const deletedlesson = this.lessonRepository.deleteOne(id);
        return new Promise((resolve, reject)=>{resolve(deletedlesson)})
    }
    deleteAll(){

        const deletedlessons = this.lessonRepository.deleteAll();
        return new Promise((resolve, reject)=>{resolve(deletedlessons)})
    }

}

module.exports = LessonService
