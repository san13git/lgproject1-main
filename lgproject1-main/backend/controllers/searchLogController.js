const SearchLog = require('../models/searchLog');

const User = require('../models/User');
const { sendDiscountEmail } = require('../services/emailService');




const logSearch = async (req, res) => {
  const { email, productId } = req.body;
  try {
    await SearchLog.updateOne(
      { userEmail: email, productId },
      { $inc: { searchCount: 1 }, $set: { timestamp: new Date() } },
      { upsert: true }
    );
    res.status(200).send('Search logged successfully');
  } catch (error) {
    res.status(500).send('Error logging search: ' + error.message);
  }
};

const identifyFrequentSearchesAndSendEmails = async () => {
  try {
    const threshold = 5; // Set the threshold to 5
    const frequentSearches = await SearchLog.find({ searchCount: { $gte: threshold } });

    for (const search of frequentSearches) {
      const user = await User.findOne({ email: search.userEmail });
      if (user) {
        const productName = `Product ${search.productId}`; // Replace with actual product name if available
        const discountCode = 'DISCOUNT2024'; // Generate or fetch a discount code
        // console.log(productName);
        // console.log(discountCode);
        // console.log(email);
        await sendDiscountEmail(user.email, productName, discountCode);
      }
    }
  } catch (error) {
    console.error('Error identifying frequent searches and sending emails:', error);
  }
};

module.exports = { logSearch, identifyFrequentSearchesAndSendEmails };

// module.exports = { logSearch };