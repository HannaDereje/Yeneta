class AdminController {
    constructor(studentService, contentManagerService, userService, lessonService, activityService, quizService) {
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
    viewUserInfo(req, res) {
        const user = this.userService.getOne(req.params.id);
        role = user.role;
        if (role == "STUDENT") {
            return this.studentService.getOne(req.params.id);
        }
        else if (role == "TEACHER") {
            return this.contentManagerService.getOne(req.params.id);
        }

    }
    approveLesson(req, res) {
        const lessons = this.lessonService.getAll()
        for (lesson in lessons) {
            if (lesson.approved == "false") {
                lesson.approved == "true";
            }
        }
    }
    approveActivity(req, res) {
        const activities = this.activityService.getAll()
        for (activity in activities) {
            if (activity.approved == "false") {
                activity.approved == "true";
            }
        }
    }
    approveQuiz(req, res) {
        const quizes = this.quizService.getAll()
        for (quiz in quizes) {
            if (quiz.approved == "false") {
                quiz.approved == "true";
            }
        }
    }
}