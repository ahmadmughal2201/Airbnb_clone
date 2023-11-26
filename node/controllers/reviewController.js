const review = require('../models/reviewModel');

async function addReview (req, res){
    try {
        console.log(req.body);
        const r = await review.create(req.body); // Product here is the schema
        res.status(201).json(r);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}

async function allReviews(req, res){
    const rid = req.params.roomId;
    console.log("Room ID: ", rid);
    try {
      const reviews = await review.find({ RID: rid }).select();
  
      // Render a page with reviews and styling
      res.status(200).send({
        success: true,
        counTotal: reviews.length,
        message: "All Reviews ",
        reviews,
      });// You'll need to create a 'reviewsPage' view
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

module.exports = {
    addReview,
    allReviews
}