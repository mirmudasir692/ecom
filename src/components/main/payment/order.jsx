import { useParams } from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Order = () => {
    const { product_id } = useParams();
    console.log("this is product id", product_id);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Use the stripe and elements objects to interact with Stripe
        // For example, you can use stripe.createPaymentMethod to handle the payment

        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        // Handle the payment method or error as needed
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <h1 className="mt-20">This is order confirmation</h1>
            <div className="w-1/2 bg-white p-4 rounded-md shadow-md ml-auto mr-auto">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#32325d',
                                fontFamily: 'Arial, sans-serif',
                                '::placeholder': {
                                    color: '#a0aec0',
                                },
                            },
                            invalid: {
                                color: '#ff3860',
                            },
                        },
                    }}
                />
            </div>
            <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/2 ml-auto mr-auto"
            >
                Submit Payment
            </button>
        </form>
    );
};

export default Order;
