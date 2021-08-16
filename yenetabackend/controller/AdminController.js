class AdminController {
    constructor(adminService, studentService, contentManagerService, userService, lessonService, activityService, quizService) {
        this.adminService = adminService;
        this.contentManagerService = contentManagerService;
        this.studentService = studentService;
        this.userService = userService;
        this.lessonService = lessonService;
        this.activityService = activityService;
        this.quizService = quizService;
        this.manageAccounts = this.manageAccounts.bind(this);
        this.viewUserInfo = this.viewUserInfo.bind(this);
        this.approveLesson = this.approveLesson.bind(this);
        this.approveActivity = this.approveActivity.bind(this);
        this.approveQuiz = this.approveQuiz.bind(this);
    }
    manageAccounts(req, res) {



    }
    async viewUserInfo(req, res) {
        return await this.userService.getAll()
            .then((response) => res.json(response))
            .catch((err) => {
                res.send(403)
                console.log("err");
            })

    }
    async approveLesson(req, res) {
        return await this.lessonService.getOne(req.params.id)
            .then((lesson) => {
                lesson.approve = "true"
                this.lessonService.updateOne(lesson._id, lesson)
                    .then((lesson) => {
                        res.json(lesson)
                    })
            })
    }
    async approveActivity(req, res) {
        return await this.activityService.getOne(req.params.id)
            .then((activity) => {
                activity.approve = "true"
                this.activityService.updateOne(activity._id, activity)
                    .then((activity) => {
                        res.json(activity)
                    })
            })
    }
    async approveQuiz(req, res) {
        return await this.quizService.getOne(req.params.id)
            .then((quiz) => {
                quiz.approve = "true"
                this.quizService.updateOne(quiz._id, quiz)
                    .then((quiz) => {
                        res.json(quiz)
                    })
            })
    }
}

module.exports = AdminController