const User = require('../models/user');
var nodemailer = require('nodemailer');
require("dotenv").config() ;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'patilayush933@gmail.com',
    pass: `${process.env.MAIL_PASSWORD}`
  }
});

let mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Inquiry About Purchasing Your Old Books',
  text: 'That was easy!'
};


exports.sendmailController=async(req,resp)=>{
     
    try{
        const{post,sender} = req.body ;
        console.log(sender);
        const user = await User.findOne({_id:`${post.user}`});
        console.log("user:",user) ;
        const receiver_mail = user.email ;
        mailOptions.from = sender.email ;
        mailOptions.to = receiver_mail ;
        mailOptions.text = `Dear ${user.name} ,
        I hope this email finds you well. As the semester approaches, I am reaching out to inquire about the possibility of purchasing the textbooks you may have used in your previous courses. I am currently looking for affordable options for the upcoming semester, and I believe your old books could be a valuable resource for my studies.
        If you have any textbooks available for sale, I would appreciate it if you could provide me with the following details:
        ${post.name}
        price: ${post.price}
        Additionally, please let me know if there are any other relevant details about the books or the transaction process. I am more than willing to meet at a convenient location to inspect the books and finalize the purchase. 
        Your assistance in this matter would be greatly appreciated. If you have a list of the books you are willing to sell or if you would like to discuss this further, please feel free to reply to this email or contact me at ${sender.email}.
        
        Thank you for considering my inquiry, and I look forward to the possibility of acquiring your old textbooks.
        
        Best regards,
        ${sender.name}
        `
        console.log("mailOption: ",mailOptions);
        //------------------------------------------------------

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              resp.status(500).send(
                {
                    success:false,
                    message:error,
                }
              )

            } else {
              console.log('Email sent: ' + info.response);
              resp.status(200).send(
                {
                    success:true,
                    message:info.response,
                })
            }
          });
    }catch(err){
        resp.status(500).send(
            {
                success:false,
                message:`got an error: ${err}`,
            }
          )

    }
}