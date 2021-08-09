class ContentManagerController {

    constructor(contentManagerService, userService) {

        this.contentManagerService = contentManagerService;
        this.userService = userService
        this.register = this.register.bind(this)

    }

    async register(req, res, next){

       

        var errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send(errors);
        }
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

                       this.userService.insert(user)
                       .then((user)=>{

                           const message = `
                           <h1>Email Confirmation</h1>
                           <h2>Hello ${req.body.name}</h2>
                           <p>Thank You for subscribing. Please confirm your email by clicking the following link</p>
                           <a href = http://localhost:5000/confirm/${user.accessToken}>Click Here</a>
                           `;
                           this.sendEmail(user.email, "Registeration", message)

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

                           this.studentService.insert(student)
                           .then((student)=>{
                               console.log(student)
                       })
                           return res.status(200).send("correct")
               
                       }).catch(err=>res.json({err}))          
                           }
                           })
                                        
                           return res.status(200).send("correct")                        
                       }).
                       catch((err)=>{
                           res.send(403)
                           console.log("err");
                       })  

                     
   }

    






}


module.exports = ContentManagerController