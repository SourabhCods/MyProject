import { message } from "antd";

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (price , onSuccessCallback) => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    //Creating an order on the backend
    const response = await fetch("http://localhost:3000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: price,
        currency: "INR",
        receipt: "receipt#1",
      }),
    });

    const order = await response.json();

    const options = {
      key: "rzp_test_nWZ781DMokiQyJ", // Razorpay Key ID
      amount: order.price,
      currency: order.currency,
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://example.com/your_logo.png",
      order_id: order.id,
      handler: async function (response) {
        //Verification of payment on the backend
        const verificationResponse = await fetch("http://localhost:3000/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }),
        });
        const verificationResult = await verificationResponse.json();
        if (verificationResult.success) {
          await onSuccessCallback();
          message.success("Order Placed ^ o ^")
        } else {
          alert("Payment Failed!");
        }
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    };

export { handlePayment } 
