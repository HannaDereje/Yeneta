const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer") 

const {check, validationResult, body} = require("express-validator");


class StudentController{

    constructor(studentService, userService, roleService, lessonService){
        this.studentService = studentService;
        this.userService = userService;
        this.roleService = roleService;
        this.lessonService = lessonService;
        this.register = this.register.bind(this);
        this.getStudent = this.getStudent.bind(this)
        this.getLesson = this.getLesson.bind(this)
        this.takeQuiz = this.takeQuiz.bind(this)
        this.getAvailableLessonNumber = this.getAvailableLessonNumber.bind(this)

    }

     

     async register(req, res, next){

       

         var errors = validationResult(req)
         if(!errors.isEmpty()){
             return res.status(400).send(errors);
         }
       return this.roleService.getOne("STUDENT")
            .then((role)=>{

            let user ={
                username:req.body.username,
                password:bcrypt.hashSync(req.body.password, 10),
                email:req.body.email,
                accessToken:crypto.randomBytes(16).toString('hex'),
                role:role._id
                }

                                        
                this.userService.getOneByEmail(req.body.email)
                .then((user)=>{

                    if(user){
                        res.status(200).json("email found")
                    }
                    else{
                        
                        this.sendEmail(user.email, "Registeration", "")
                        this.userService.insert(user)
                        .then((user)=>{

                            let student = {
                                name:req.body.name,
                                email:req.body.email,
                                age:req.body.age,
                                prefered_Date:req.body.prefered_Date,
                                country:req.body.country,
                                image:req.file.originalname +"___" + req.file.mimetype,
                                level:req.body.level,
                                user:user._id,
                                lessons:[]
                            }
                        })
                        this.studentService.insert(student)
                            .then((student)=>{
                                console.log(student)
                        })
                        }
                                                            
                        })
                        })  
                      
    }

    async getStudent(req, res){

        await this.userService.getOne(req.user_id._id)
                            .then((response) => res.json(response))
                            .catch((err)=>{
                                res.send(403)
                                console.log("err");
                            })


    }

    async getLesson(req, res){

       return this.userService.getOne(req.user_id._id)
            .then((user)=>{
                const lessons = user.lessons;

                if(lessons.length==0){
                    this.lessonService.getOneByNumber(1)
                        .then((lesson)=>{
                            if(lessson){
                            lessons.push(lessson)
                            this.sendEmail(user.email, "Yeneta Contact", "New Lesson has uploaded")
                            res.status(200).json(lessons)
                            }
                        })
                }else{
                    const lastlessson = lessons[length-1].number;
                    this.lessonService.getOneByNumber(lastlessson+1)
                        .then((nextlesson)=>{
                            if(nextlesson){
                                lessons.push(nextlesson)
                                this.sendEmail(user.email, "Yeneta Contact", "New Lesson has uploaded")
                                res.status(200).json(lessons)
                            }else{
                                return  res.status(200).json("Lesson is not Available")
                             }
                        })
                }

            })
        }

       

    async takeQuiz(req, res){

        const user = await this.userService.getOne(req.user_id._id)

        const lessons = user.lessons;
        const quizes = user.quizes;

        const aquiz = "";

        if(lessons.length < 3)
            return res.status(200).json("No ready to take Quiz")
        else{

            for (let i = 0; i < lessons.length; i++) {
                if(lessons.length % 3 == 0){
                    quizes.push(aquiz)
                }
               if(quizes.length == 3){
                return res.status(200).json("Ready for the next level...") 
               } 
            }

        }

    }

    async getAvailableLessonNumber(req, res){
        const user = await this.userService.getOne(req.user_id._id)
        return res.status(200).json(user.lessons.length);
    }


       
    async sendEmail(to , subject, message){

        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure:false,
            auth: {
              user: 'yenetalear@gmail.com',
              pass: 'hhhk1234@#'
            },
            tls:{
                rejectUnauthorized:false
            }
          });
          
          var mailOptions = {
            from: ' "Yeneta contact" <yenetalear@gmail.com>',
            to:to,
            subject: subject,
            text: message
          };
          
           transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    }
    
    
    

    

}


module.exports = StudentController