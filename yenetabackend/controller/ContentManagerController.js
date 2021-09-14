const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer") 

const {check, validationResult, body} = require("express-validator");



class ContentManagerController {

    constructor(contentManagerService, userService, roleService) {

        this.contentManagerService = contentManagerService;
        this.userService = userService
        this.roleService = roleService
        this.register = this.register.bind(this)
        this.getProfileInfo = this.getProfileInfo.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
        this.getAll = this.getAll.bind(this)

    }

    async register(req, res, next){

        var errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send(errors);
        }
        console.log(req.body)
       return this.roleService.getOne("TEACHER")
           .then((role)=>{

           let user ={
               username:req.body.username,
               password:bcrypt.hashSync(req.body.password, 10),
               email:req.body.email,
               accessToken:crypto.randomBytes(16).toString('hex'),
               role:role._id
               }

                                       
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
                        console.log(info)
                        if(!info){
                            this.userService.insert(user)
                            .then((user)=>{
     
                                
                                let teacher = {
                                    name:req.body.name,
                                    email:req.body.email,
                                    job:req.body.job,
                                    experience:req.body.experience,
                                    user:user._id
                                }
     
                                this.contentManagerService.insert(teacher)
                                .then((teacher)=>{
                                    console.log(teacher)
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

   async getProfileInfo(req, res){

    if(req.user_id === null){
        res.status(403)
        return res.send("You need to sign in.")
    }
    return  this.userService.getOne(req.user_id._id)
                    .then((user)=>{
                        this.contentManagerService.getOneByEmail(user.email)
                            .then((contentManager)=>{
                                res.status(200).json({"contentManager":contentManager, "user":user});
                            })
                    })
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
        html: message
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

getAll(req, res) {

    var emails=[]
    return this.contentManagerService.getAll()
        .then(contentmanager=>{

            contentmanager.forEach(element=>{
                emails.push(element.email)
            })

             this.userService.getMany(emails)
                .then(users=>{
                    res.status(200).send({"contentmanager":contentmanager, "users":users})
                })

        })
        .catch((err) => {
            res.send(403)
            console.log("err");
        })


}

getTeachersLesson(req, res){

    if(req.user_id === null){
        res.status(403)
        return res.send("You need to sign in.")
    }
}









}


module.exports = ContentManagerController