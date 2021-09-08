const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer") 

const {check, validationResult, body} = require("express-validator");


class StudentController{

    constructor(studentService, userService, roleService, lessonService, quizService, activityResultService){
        this.studentService = studentService;
        this.userService = userService;
        this.activityResultService = activityResultService
        this.roleService = roleService;
        this.lessonService = lessonService;
        this.quizService = quizService
        this.register = this.register.bind(this);
        this.getStudent = this.getStudent.bind(this)
        this.getLesson = this.getLesson.bind(this)
        this.takeQuiz = this.takeQuiz.bind(this)
        this.updateStudent = this.updateStudent.bind(this)
        this.getStudentBeforeLogin = this.getStudentBeforeLogin.bind(this)
        this.updateOnSubmission = this.updateOnSubmission.bind(this)
        this.getAvailableLessons = this.getAvailableLessons.bind(this)

    }

     
     register(req, res, next){

       

        var errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send(errors);
        }
        console.log(req.file)
       return this.roleService.getOne("STUDENT")
           .then((role)=>{

           let user ={
               username:req.body.username,
               password:bcrypt.hashSync(req.body.password, 10),
               email:req.body.email,
               accessToken:crypto.randomBytes(16).toString('hex'),
               role:role._id,
               expireDate:new Date().getDate()+1
               }
               console.log(user)
                                       
               this.userService.getOneByEmail(req.body.email)
               .then((userfromdata)=>{

                   if(userfromdata){
                      return res.status(200).json("email found")
                   }
                   else{
                    const message = `
                    <h1>Email Confirmation</h1>
                    <h2>Hello ${req.body.name}</h2>
                    <p>Thank You for subscribing. Please confirm your email by clicking the following link</p>
                    <a href = http://localhost:3000/confirm/${user.accessToken}>Click Here</a>
                    `;
                 this.sendEmail(user.email, "Registeration", message)
                    .then((info)=>{
                        if(!info){
                            this.userService.insert(user)
                            .then((user)=>{
                                
                                let student = {
                                    name:req.body.name,
                                    email:req.body.email,
                                    age:req.body.age,
                                    country:req.body.country,
                                    image:req.file.originalname,
                                    user:user._id,
                                    lessons:[],
                                    quizes:[]
                                }
     
                                this.studentService.insert(student)
                                .then((student)=>{
                                    console.log(student)
                                    res.status(200).send("Confirm your Email Please !!")
                                 }) 
                                 
                            })  
                        }
                    })
                                
                           }
                        })                        
                       }).
                       catch((err)=>{
                           res.send(404)
                           console.log(err);
                       })  

                     
   }
     getStudent(req, res){
        if(req.user_id === null){
            res.status(403)
            return res.send("You need to sign in.")
        }
        return  this.userService.getOne(req.user_id._id)
                    .then((user)=>{
                        this.studentService.getOneByEmail(user.email)
                            .then((student)=>{
                                res.status(200).json({"Student":student, "user":user});
                            })
                    })


    }

    getStudentBeforeLogin(req, res){

        console.log(req.email)
            this.studentService.getOneByEmail(req.email)
                .then((student)=>{
                    console.log(student)
                    res.status(200).json({"Student":student});
                })

    }

    async updateStudent(req, res){
        
        if(req.user_id === null){
            res.status(403)
            return res.send("You need to sign in.")
        }

        const level =req.body.level

        return  this.userService.getOne(req.user_id._id)
                    .then((user)=>{
                        this.studentService.getOneByEmail(user.email)
                            .then((student)=>{
                                student.level = level
                                student.approved = true
                                this.studentService.updateOne(student._id, student)
                                    .then(updatedStudent=>{
                                        res.status(200).json({"Student":updatedStudent});
                                        console.log(updatedStudent)
                                    })
                             })
                    }).
                    catch((err)=>{
                        res.send(404)
                        console.log(err);
                    }) 
    }

     getLesson(req, res) {


        const level2 = req.query.level.split(" ")[1];
        console.log(level2)
        var breake = true;
        var ids = []

        return this.userService.getOne(req.user_id._id)
            .then((user) => {

                return this.studentService.getOneByEmail(user.email)
                    .then((student) => {

                        return this.lessonService.getAll()
                            .then((lessons) => {

                                const approved = lessons.filter(lesson =>  lesson["level"] == level2)
                                const sortedLessons = approved.sort((lesson1, lesson2) => { (lesson1.number < lesson2.number ? 1 : -1) })
        
                                sortedLessons.forEach(lesson => {

                                    if (breake == true) {

                                        var x = student.lessons.find( studentlesson => studentlesson.split("_")[0] == lesson._id );
                                        console.log(x)    

                                        if(!x){
                                            var id = lesson._id + "_notsubmitted"
                                            student.lessons.push(id)
                                            breake = false
                                        }
                    
                                        
                                    }
                                })
                                this.studentService.updateOne(student._id, student)
                                    .then((student) => {
                                        this.sendEmail(user.email, "Yeneta Contact", "New Lesson has uploaded")

                                        res.status(200).send(student)
                                    })

                            })
                    })




            })
    }

     updateOnSubmission(req, res){

          if(req.user_id === null){
            res.status(403)
            return res.send("You need to sign in.")
        }  

        const id = req.body.id
        const result ={ 
            result : req.body.result,
            user:req.user_id._id,
            activity:req.body.activity
        }
        console.log(id)
        console.log(result)

        return  this.userService.getOne(req.user_id._id)
                    .then((user)=>{
                        this.studentService.getOneByEmail(user.email)
                            .then((student)=>{

                                const x = student.lessons.find( lesson => lesson.split("_")[0] === id );
                                if(x !== undefined){
                                    let index = student.lessons.findIndex(lesson => lesson.split("_")[0] === id);
                                    console.log(x, index)
    
                                    student.lessons[index] = id + "_submitted"

                                     this.studentService.updateOne(student._id, student)
                                    .then(updatedStudent=>{

                                        this.activityResultService.insert(result)
                                            .then(result=>{
                                                res.status(200).json({"Student":updatedStudent, "result": result});
                                                console.log(updatedStudent)
                                            })
                                       
                                    })
                                }
                               

                               
                             })
                    }).
                    catch((err)=>{
                        res.send(404)
                        console.log(err);
                    })

    }

    getAvailableLessons(req, res){

        if(req.user_id === null){
            res.status(403)
            return res.send("You need to sign in.")
        }  
        return  this.userService.getOne(req.user_id._id)
        .then((user)=>{
            this.studentService.getOneByEmail(user.email)
                .then((student)=>{
                    res.status(200).send(student.lessons)
                })

            })

    }

       

     takeQuiz(req, res){

        var breake = true;
        var ids=[]
        
        const level = req.query.level.split(" ")[1];
        console.log(level)

        return this.userService.getOne(req.user_id._id)
            .then((user)=>{

            this.studentService.getOneByEmail(user.email)
                .then((student)=>{
                
                    this.quizService.getAll()
                        .then((retrivedQuiz)=>{

                           
                            const approved = retrivedQuiz.filter(quiz => quiz["level"] == level)
                            const sortedQuiz = approved.sort((quiz1, quiz2) => (quiz1.number < quiz2.number ? 1:-1))
                           console.log(approved)
                          
                             sortedQuiz.forEach(quiz => {

                                if (breake == true) {

                                    var x = student.quizes.find( studentquiz => studentquiz.split("_")[0] == quiz._id );
                                    console.log(x)    

                                    if(!x){
                                        var id = quiz._id + "_notsubmitted"
                                        student.quizes.push(id)
                                        breake = false
                                    }
                
                                    
                                }
                                    })

                                this.studentService.updateOne(student._id, student)
                                    .then((student)=>{
                                      this.sendEmail(user.email, "Yeneta Contact", "New Quiz has uploaded")
    
                                    res.status(200).send(student)
                                    })
                                
                                }) 
                                   
    
                            })

                           
                                
                            });

            

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
              return error
            } else {
              console.log('Email sent: ' + info.response);
              return info
            }
          });

    }
    
    
    

    

}


module.exports = StudentController