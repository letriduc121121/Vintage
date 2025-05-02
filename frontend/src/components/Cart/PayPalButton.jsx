import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
//phuong thuc thanh toan
const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    // <PayPalScriptProvider options={{ "client-id": "AVmxv1b90oJHTsXDeYKdDzyZdAnMRAiLXrZtIRGsP7joJN3iSEUfiFz5aDXkuuWHTOz09o7ZQAn43aGE" }}>
    <PayPalScriptProvider 
    options={{ 
            "client-id": 
            import.meta.env.VITE_PAYPAL_CLIENT_ID
     }}>    

        <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{ amount: { value: parseFloat(amount).toFixed(2) } },

                    ],
                });
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then(onSuccess);
            }}
            onError={onError}
        />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;