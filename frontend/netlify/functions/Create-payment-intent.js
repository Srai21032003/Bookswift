// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// exports.handler = async (event, context) => {
//   try {
//     // Parse the request body (since Netlify Functions use event instead of req)
//     const product = JSON.parse(event.body);

//     // Map over the products and create line items for Stripe
//     const lineItems = product.map((item) => ({
//       price_data: {
//         currency: 'inr',
//         product_data: {
//           name: item.dish, // Assuming 'dish' is the name of the product
//         },
//         unit_amount: item.price * 100, // Stripe expects amount in the smallest currency unit (e.g., paise)
//       },
//       quantity: item.qnty, // Quantity of the item
//     }));

//     // Create the checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: 'http://localhost:5173/success', // Adjust as per your frontend
//       cancel_url: 'http://localhost:5173/cancel', // Adjust as per your frontend
//     });

//     // Return the session ID in the response
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ id: session.id }),
//     };

//   } catch (error) {
//     console.error('Error creating checkout session: ', error);

//     // Return error message in case of failure
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message }),
//     };
//   }
// };
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Ensure your secret key is set in Netlify env vars

exports.handler = async (event, context) => {
  try {
    // Parse the request body (Netlify Functions use event instead of req)
    const product = JSON.parse(event.body);

    // Map over the products and create line items for Stripe Checkout
    const lineItems = product.map((item) => ({
      price_data: {
        currency: 'inr',  // Indian Rupee currency
        product_data: {
          name: item.dish, // Assuming 'dish' is the name of the product
        },
        unit_amount: item.price * 100, // Stripe expects amount in the smallest currency unit (e.g., paise)
      },
      quantity: item.qnty, // Quantity of the item
    }));

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://bookswift.netlify.app/success', // Replace with your frontend success URL
      cancel_url: 'https://bookswift.netlify.app/cancel', // Replace with your frontend cancel URL
    });

    // Return the session ID in the response
    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };

  } catch (error) {
    console.error('Error creating checkout session: ', error);

    // Return error message in case of failure
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
