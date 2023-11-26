const payingGuest = require('../models/payingGuest');



async function addGuest (req, res){
    try {
        console.log(req.body);
        const guest = await payingGuest.create(req.body); // Product here is the schema
        res.status(201).json(guest);
    } catch (error) {
        res.status(500).json({ apierror: error });
    }
}


async function updatePayingGuest(customerId, updatedData) {
  try {
    // Find the paying guest document with the given customerId
    const PPayingGuest = await payingGuest.findOne({ CID: customerId });

    if (!PPayingGuest) {
      // If the paying guest with the given customerId doesn't exist, handle accordingly
      console.log(`Paying guest with CID ${customerId} not found.`);
      return null; // or throw an error, depending on your use case
    }

    // Update the fields with the provided data
    PPayingGuest.Status = updatedData.Status !== undefined ? updatedData.Status : PPayingGuest.Status;
    PPayingGuest.Wallet = updatedData.Wallet !== undefined ? updatedData.Wallet : PPayingGuest.Wallet;

    // Save the updated document
    const updatedPayingGuest = await PPayingGuest.save();

    console.log(`Paying guest with CID ${customerId} updated successfully.`);
    return updatedPayingGuest;

  } catch (error) {
    console.error('Error updating paying guest:', error);
    throw error; // Handle the error according to your application's needs
  }
}

async function check (req, res) {
    const customerId = req.params.customerId;
  
    try {
      // Find the paying guest document with the given customerId
      const existingWallet = await payingGuest.findOne({ CID: customerId });
  
      if (existingWallet) {
        res.status(200).json(existingWallet);
      } else {
        res.status(404).json({ error: 'Wallet not found' });
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


module.exports = {
    addGuest,
    updatePayingGuest,
    check
}