
const fundingSources = [
     paypal.FUNDING.CARD
   ]

 for (const fundingSource of fundingSources) {
   const paypalButtonsComponent = paypal.Buttons({
     fundingSource: fundingSource,

     // optional styling for buttons
     // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
     style: {
       shape: 'pill',
       height: 40,
     },

     // set up the transaction
     createOrder: (data, actions) => {

      
       // pass in any options from the v2 orders create call:
       // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
       const createOrderPayload = {
           application_context:{
                shipping_preference: "NO_SHIPPING"
           },
           address:{
                
           },
         purchase_units: [
           {
             amount: {
               value: '5.00',
             },
           },
         ],
       }

       return actions.order.create(createOrderPayload)
     },

     // finalize the transaction
     onApprove: (data, actions) => {
       const captureOrderHandler = (details) => {
         const payerName = details.payer.name.given_name
         // AQUI VA EL INICIO DE LAS PREGUNTAS
         alert(details)
         console.log('Transaction completed!')
         
         
       }

       return actions.order.capture().then(captureOrderHandler)
     },

     // handle unrecoverable errors
     onError: (err) => {
       alert(err)
     },
   })

   if (paypalButtonsComponent.isEligible()) {
     paypalButtonsComponent
       .render('#paypal-button-container')
       .catch((err) => {
         console.error('PayPal Buttons failed to render')
       })
   } else {
     console.log('The funding source is ineligible')
   }
 }