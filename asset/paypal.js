function cuestionario(){
            const element ='<h3>Aqui comienza el cuestionario :)</h3>'; 
            return element
          }

          function initPayPalButton() {
            const fundingSources = [
           paypal.FUNDING.CARD
         ]
            paypal.Buttons({
              style: {
                shape: 'rect',
                color: 'black',
                layout: 'vertical',
                label: 'checkout',
                
              },
              
      
              createOrder: function(data, actions) {
                
                return actions.order.create({
                  application_context:{
                      shipping_preference: "NO_SHIPPING"
                 },
                 address:{
                      
                 },
                  purchase_units: [{"amount":{"currency_code":"EUR","value":5}}]
                });
              },
      
              onApprove: function(data, actions) {
                return actions.order.capture().then(function(orderData) {
                  
                  // Full available details
                  console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
      
                  // Show a success message within this page, e.g.
                  const element = document.getElementById('paypal-button-container');
                  element.innerHTML = '';
                  element.innerHTML = cuestionario();
      
                  // Or go to another URL:  actions.redirect('thank_you.html');
                  
                });
              },
      
              onError: function(err) {
                console.log(err);
              }
            }).render('#paypal-button-container');
          }
          initPayPalButton();