const braintree = require("braintree");

const gateway= new braintree.BraintreeGateway({
    
        environment: braintree.Environment.Sandbox,
        merchantId: "ff7w3jvpcsj6qtbm",
        publicKey: "zww2vqpf8cnhcswx",
        privateKey: "dd3d003122b36d2343b6c1a0a3fd8111"

    
    
    
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        //pass clienttoken to your front-end
        if (err) {
            res.status(500).send(err);
        }else{
            console.log("token",response)
            res.send(response);

        }
    });

};
exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
            submitForSettlement: true
        }
    
    },(err,result)=>{
        if (err) {
            res.status(500).json(error);
        }else{
            res.json(result);
        }

    }
    );
    
    
};