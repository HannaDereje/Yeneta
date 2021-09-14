
class LessonController{

    constructor(lessonService, activityService, questionService, contentManagerService, userService){
        this.lessonService = lessonService;
        this.activityService = activityService;
        this.questionService = questionService
        this.contentManagerService = contentManagerService
        this.userService= userService
        
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.getTeachersLesson = this.getTeachersLesson.bind(this)
    }

    insert(req, res) {
        const answer = req.body.activity.answer
        const content = req.body.activity.content
        const qs = []
        var ids = []

        var question = {}
        for (var i = 0; i < answer.length; i++) {
            question[i] = {
                content: content[i],
                answer: answer[i],
                level: req.body.level
            }
            qs.push(question)

            this.questionService.insert(question[i]).then((response) => {
                ids.push(response.id)
                if (ids.length == qs.length) {
                    const activity = {
                        level: req.body.level,
                        questions: ids
                    }
                    return this.activityService.insert(activity)
                        .then((response) => {

                            return this.lessonService.getCount().then(n => {
                                const lesson = {
                                    topic: req.body.topic,
                                    number: n + 1,
                                    note: req.body.note,
                                    videoLink: req.body.videoLink,
                                    level: req.body.level,
                                    activity: response._id,
                                    user:req.user_id._id
                                }
                                return this.lessonService.insert(lesson)
                                    .then((lesson) => {

                                         res.send(lesson)
                            })
                        })

                        .catch((err) => {
                            res.status(403)
                            console.log(err);
                        })
                })


            }
            })

            

    
    }
    }

    getAll(req, res){
        return  this.lessonService.getAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    getOne(req, res){
        return this.lessonService.getOne(req.params.id)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log(err);
                                })
    }

    updateOne(req, res){

    
        const info=req.body

        return this.lessonService.getOne(req.params.id)
                    .then(lesson=>{
                        lesson.note = info.note
                        return this.lessonService.updateOne(req.params.id, lesson)
                        .then((response) => {
                        console.log(response)
                        res.json(response)
                    })
                    }).catch((err)=>{     
                                    res.send(403)
                                    console.log(err);
                                })
    }
    deleteOne(req, res){
        return this.lessonService.deleteOne(req.params.id)
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    deleteAll(req, res){
        return this.lessonService.deleteAll()
                                .then((response) => res.json(response))
                                .catch((err)=>{
                                    res.send(403)
                                    console.log("err");
                                })
    }
    getTeachersLesson(req, res){

        if(req.user_id === null){
            res.status(403)
            return res.send("You need to sign in.")
        }

        return this.lessonService.getOneByUser(req.user_id._id)
                    .then(lesson=>{
                        console.log(lesson)
                        res.send(lesson)
                    })
    
        
    }
    

}


module.exports = LessonController