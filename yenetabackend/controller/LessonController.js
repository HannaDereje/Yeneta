
class LessonController {

    constructor(lessonService, activityService, questionService) {
        this.activityService = activityService
        this.questionService = questionService
        this.lessonService = lessonService;
        this.approveLesson = this.approveLesson.bind(this);
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);

    }

    async insert(req, res) {
        const answer = req.body.activity.answer
        const content = req.body.activity.content
        const qs = []
        var ids = []
        //console.log(answer)
        var question = {}
        for (var i = 0; i < answer.length; i++) {
            question[i] = {
                content: content[i],
                answer: answer[i],
                level: req.body.level
            }
            //  console.log(question)

            qs.push(question)
            //console.log(qs)
            this.questionService.insert(question[i]).then((response) => {
                ids.push(response.id)
                if (ids.length == qs.length) {
                    const activity = {
                        level: req.body.level,
                        due_date: req.body.due_date,
                        questions: ids
                    }
                    console.log(req.body.due_date)
                    return this.activityService.insert(activity)
                        .then((response) => {
                            const lesson = {
                                topic: req.body.topic,
                                number: req.body.number,
                                note: req.body.note,
                                videoLink: req.body.videoLink,
                                level: req.body.level,
                                activity: response._id
                            }
                            this.lessonService.insert(lesson)
                                .then((response) => {
                                    res.json(response)
                                })
                        })
                        .catch((err) => {
                            res.status(403)
                            console.log("err");
                        })
                }



            })

        }


    }





    getAll(req, res) {
        return this.questionService.getAll()
            .then((response) => res.json(response))
            .catch((err) => {
                res.send(403)
                console.log("err");
            })
        let lesson = {
            number: req.body.number,
            topic: req.body.topic,
            note: req.body.note,
            level: req.body.level,
            videoLink: req.body.videoLink,


        }
        return this.lessonService.insert(lesson)
            .then((response) => res.json(response))

            .catch((err) => {
                res.status(403)
                console.log("err");
            })
    }

    async getAll(req, res) {
        return this.lessonService.getAll()
            .then((response) => res.json(response))
            .catch((err) => {
                res.send(403)
                console.log("err");
            })
    }
    async getOne(req, res) {
        return this.lessonService.getOne(req.params.id)
            .then((response) => res.json(response))
            .catch((err) => {
                res.status(403).send(err)
                console.log("err");
            })
    }


    updateOne(req, res) {
        return this.lessonService.updateOne(req.params.id, req.body)
            .then((response) => res.json(response))
            .catch((err) => {
                res.send(403)
                console.log("err");
            })
    }
    deleteOne(req, res) {
        return this.lessonService.deleteOne(req.params.id)
            .then((response) => res.json(response))
            .catch((err) => {
                res.send(403)
                console.log("err");
            })
    }
    deleteAll(req, res) {
        return this.lessonService.deleteAll()
            .then((response) => res.json(response))
            .catch((err) => {
                res.send(403)
                console.log("err");
            })
    }
    approveLesson(req, res) {
        if (!req.body.approved) {
            req.body.approved = true
        }
        return this.lessonService.updateOne(req.params.id, req.body)
            .then((response) => res.json(response))
            .catch((err) => {
                res.send(403)
                console.log("err");
            })


    }


}


module.exports = LessonController