
class LessonController {

    constructor(lessonService) {
        this.lessonService = lessonService;
        this.insert = this.insert.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.updateOne = this.updateOne.bind(this);

    }

    async insert(req, res) {
        let lesson = {
            lessonNumber: req.body.number,
            topic: req.body.topic,
            notes: req.body.note,
            level: req.body.level,
            imageDescription: req.body.imageDescription,
            videoLink: req.body.videoLink,
            image: req.file.originalname + "___" + req.file.mimetype,
            audio: req.file.originalname + "___" + req.file.mimetype,
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


}


module.exports = LessonController