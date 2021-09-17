const crypto = require("crypto");
const bcrypt = require("bcryptjs");


class AdminController {
    constructor(adminService, studentService, contentManagerService, userService, lessonService, activityService, quizService, roleService) {
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
        this.saveAdmin = this.saveAdmin.bind(this)
        this.roleService = roleService
    }

    saveAdmin(){

        
       return this.roleService.getOne("ADMIN")
       .then((role)=>{
           console.log(role)

        let user ={
            status:"Active",
            username:"YenetaLearn",
            password: bcrypt.hashSync("Yenetalearning", 10),
            email:"Yenetalear@gmail.com",
            accessToken:crypto.randomBytes(16).toString('hex'),
            role:role._id,
            }

            console.log(user)
       
        
        this.userService.insert(user)
            .then((userfromdata)=>{

                const admin={
                    name:"Yeneta",
                    email:"Yenetalear@gmail.com", 
                    user:userfromdata._id
                }
                console.log(userfromdata)
                this.adminService.insert(admin)
                .then((adminfromdata)=>{
                    console.log(adminfromdata)
                 })
            })

        })
    } 

    manageAccounts(req, res) {

        

    }
   async viewUserInfo(req, res) {
        return await  this.userService.getAll()
        .then((response) => res.json(response))
        .catch((err)=>{
            res.send(403)
            console.log("err");
        })

    }
   async approveLesson(req, res) {
        return await this.lessonService.getOne(req.params.id)
        .then((lesson)=>{
            lesson.approve = "true"
            this.lessonService.updateOne(lesson._id, lesson)
            .then((lesson)=>{
                res.json(lesson)
            })
        })
    }
    async approveActivity(req, res) {
        return await this.activityService.getOne(req.params.id)
        .then((activity)=>{
            activity.approve = "true"
            this.activityService.updateOne(activity._id, activity)
            .then((activity)=>{
                res.json(activity)
            })
        })
    }
    async approveQuiz(req, res) {
        return await this.quizService.getOne(req.params.id)
        .then((quiz)=>{
            quiz.approve = "true"
            this.quizService.updateOne(quiz._id, quiz)
            .then((quiz)=>{
                res.json(quiz)
            })
        })
    }
}


module.exports = AdminController