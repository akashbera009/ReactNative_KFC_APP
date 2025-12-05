import RazorpayCheckout from 'react-native-razorpay';
import { useThemeColors } from './Colors';
import { useStrings } from './Strings';
import { DeliveryDetails } from '../data/DeliveryDetails';

export const useRazorpayPayment = () => {
    const Colors = useThemeColors();
    const Strings = useStrings();

    const handlePayment = async (amount: number) => {
        try {
            const options = {
                description: 'Credits towards orders',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWp9hoNV1qp1p83g-DwIQA7dU-XzIeelAHwg&s',
                currency: 'INR',
                key: 'rzp_test_v4UV05zNfrIcEE',
                amount: String(Math.round(amount * 100)),
                name: 'KFC',
                prefill: {
                    email: DeliveryDetails?.email,
                    contact: DeliveryDetails?.mobileNumber,
                    name: DeliveryDetails?.personName
                },
                method: {
                    card: false
                },
                theme: { color: Colors.KFC_red }
            };

            const data = await RazorpayCheckout.open(options);
            return { success: true, payment_id: data.razorpay_payment_id };

        } catch (error: any) {
            return { success: false, error: error.description };
        }
    };

    return { handlePayment };
};
