const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const {check, validationResult, body} = require("express-validator");

const nodemailer = require("nodemailer") 


class UserController{

    constructor(userService, roleService){
        this.userService = userService;
        this.roleService = roleService;
        this.login = this.login.bind(this);
        this.generateAuthToken = this.generateAuthToken.bind(this)
        this.verifyToken = this.verifyToken.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.authRole = this.authRole.bind(this)
        this.verifyUser = this.verifyUser.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
        this.ResetPassword = this.ResetPassword.bind(this)
        this.verifyPassword = this.verifyPassword.bind(this)
    }

     generateAuthToken(id, role){

        const token = jwt.sign({_id:id, role:role}, "secret_key")
        return token
    }

    async login(req, res){

        console.log(req.body.email)
             this.userService.getOneByEmail(req.body.email)
                                        .then((user) =>{
                                        
                                            if(!user){
                                                res.json({message:"User does not exist"});
                                                return
                                            }
                                            if(user.status !== "Active")
                                            {
                                                res.json({message:"User is not verified"});
                                                return
                                            }
                                            if(!bcrypt.compareSync(req.body.password, user.password)){
                                                res.json({message:"Wrong Password"});
                                                return 
                                            }

                                            this.roleService.getOneById(user.role)
                                             .then((role)=>{

                                                const token = this.generateAuthToken(user._id, role.role)
                                       
                                                res.status(200).json({
                                                        token:token,
                                                        role:role.role
                                                }
                                                ) 
                                                }).catch((err)=>{
                                                    res.sendStatus(403)
                                                    console.log(err);
                                                })
                                        })  
                                        .catch((err)=>{
                                            res.sendStatus(403)
                                            console.log(err);
                                        })
    }


    async getAllUsers(req, res){
        return await this.userService.getAll() 
                        .then((response) => res.json(response))
                        .catch((err)=>{
                            res.send(403)
                            console.log("err");
                        })
    }


    async verifyToken(req, res, next){

        const token = req.headers["x-access-token"] || req.headers["authorization"];
        
        if(!token) return res.status(401).json("access denied");

        try{
            const decoded = jwt.verify(token, "secret_key");
            req.user_id = decoded;  
            console.log(req.user_id)
           

            next()
            
        }catch(error){
            console.log(error)
        }
    }

     authRole(role){

        return (req, res, next) =>{
           if(req.user_id.role !== role){
               res.status(401)
               return res.send("Not Allowed")
           }
           next()
        }
    }

    async verifyUser(req, res, next){
        console.log(req.params.accessToken)
         this.userService.getOneByToken(req.params.accessToken)
                         .then((user)=>{

                            if(!user){
                                return res.status(404).send({message:"User Not found"});
                            }
                            if(user.expireDate >= new Date().getDate()){
                                return res.status(404).send({message:"User Not found"});
                            }
                            user.status = "Active";
                            this.userService.updateOne(user._id, user)
                                     .then((user)=>{
                                         console.log(user)
                                        res.status(200).send({message:"User Verified"});  
                                     })

                            next()
                         }).catch((e)=>{ console.log("error", e)})


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

     async ResetPassword(req, res){
         
        this.userService.getOneByEmail(req.body.email)
                        .then((user)=>{

                            if(!user){
                                return res.status(404).send({message:"User Not found"});
                            }
                            const message = `
                            <h1>Password Reset</h1>
                            <h2>Hello ${user.username}</h2>
                            <p>Please Reset your password clicking the following link</p>
                            <a href = http://localhost:3000/passwordReset/${user.accessToken}>Click Here</a>
                            `;
                            this.sendEmail(user.email, "Password Reset", message)
                                .then((info)=>{
                                    console.log(info)
                                }).catch((err)=>{
                                    res.send(404)
                                    console.log(err);
                                }) 
                        }).catch((err)=>{
                            res.send(404)
                            console.log(err);
                        }) 
     }

     async verifyPassword(req, res){
        
        console.log(req.params.accessToken)
        this.userService.getOneByToken(req.params.accessToken)
                        .then((user)=>{

                            if(!user){
                                return res.status(404).send({message:"Invalid Link"});
                            }

                        user.password=bcrypt.hashSync(req.body.password, 10)
                        this.userService.updateOne(user._id, user)
                                        .then((user)=>{
                                            console.log(user)
                                            res.status(200).send({message:"Password Reseted"});  
                                        })

                         }).catch((e)=>{ console.log("error", e)})


     }

}
module.exports = UserController
