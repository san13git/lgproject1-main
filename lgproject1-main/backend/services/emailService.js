// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   service: 'gmail',

//   auth: {
    
//     user:"kushx0009@gmail.com",
//     pass:"omgn lshm ifbx yrpc",
//   },
  

// });

// const sendDiscountEmail = async (email, productName, discountCode) => {
  
//   const mailOptions = {
   
//     from:"kushx0009@gmail.com",
//     to: email,
//     subject: `Exclusive Discount on ${productName}`,
//     text: `Thank you for your interest in ${productName}. Use the discount code ${discountCode} to get a special discount on your next purchase.`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("discount email is sent to the user")
//     console.log(`Discount email sent to ${email} for ${productName}`);
//   } catch (error) {
//     console.error('Error sending discount email:', error);
//   }
// };
// // const email = 'sanyab1302@gmail.com'; // Replace with the recipient's email
// // const productName = 'SuperWidget';
// // const discountCode = 'SAVE20';

// sendDiscountEmail(email, productName, discountCode)
//   .then(() => console.log('Email send function executed successfully'))
//   .catch((error) => console.error('Email send function failed:', error));

// module.exports = { sendDiscountEmail };

const nodemailer = require('nodemailer');
const axios = require('axios');

// Configure the transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "kushx0009@gmail.com",
    pass: "omgn lshm ifbx yrpc"
  }
});

// Function to send discount emails
const sendDiscountEmail = async (userEmail, productName, discountCode) => {
  const mailOptions = {
    from: "kushx0009@gmail.com",
    to: userEmail,
    subject: `Exclusive Discount on ${productName}`,
    text: `Thank you for your interest in ${productName}. Use the discount code ${discountCode} to get a special discount on your next purchase.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Discount email sent to ${userEmail} for ${productName}`);
  } catch (error) {
    console.error('Error sending discount email:', error);
  }
};

// Function to fetch data and identify frequent searches and send emails
const identifyFrequentSearchesAndSendEmails = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/searches/log');
    const searchLogs = response.data;

    const threshold = 5; // Set the threshold to 5
    for (const search of searchLogs) {
      if (search.searchCount >= threshold) {
        const userEmail = search.userEmail;
        const productId = search.productId;
        const productName = `Product ${productId}`; // Replace with actual product name if available
        const discountCode = 'DISCOUNT2024'; // Generate or fetch a discount code
        const emailSent = await sendDiscountEmail(userEmail, productName, discountCode);
        
        if (emailSent) {
          console.log(`Email sent successfully to ${userEmail} for ${productName}`);
        } else {
          console.log(`Failed to send email to ${userEmail} for ${productName}`);
        }
        // await sendDiscountEmail(userEmail, productName, discountCode);
      }
    }
  } catch (error) {
    console.error('Error identifying frequent searches and sending emails:', error);
  }
};

module.exports = {
  sendDiscountEmail,
  identifyFrequentSearchesAndSendEmails
};
