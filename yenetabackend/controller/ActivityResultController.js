class ActivityResultController{

    constructor(activityService, activityAnswerService, questionService, activityResult){
        this.questionService = questionService;
        this.activityResult = activityResult
        this.activityService = activityService
        this.activityAnswerService = activityAnswerService
        this.checkResultForActivity = this.checkResultForActivity.bind(this)
        
    }
    checkResultForActivity(req, res) {
        this.activityService.getOne(req.params.id)
            then((activity)=>{
                this.activityAnswerService.getByActivity(activity._id)
                    .then((studentAnswers)=>{
                        for (question in activity.questions) {
                            this.questionService.getOne(question.id)
                                then((result)=>{
                                    const answer = result.answer

                                    for (let i = 0; i < studentAnswers.length; i++) {
                                        if (studentAnswers[i] == answer) {
                                            total = total + 1;
                                        }
                        
                                    }
                                })
                        }

                        res.status(200).json(total);
                    })

            })

    }
}

module.exports = ActivityResultController