// Place any imports required by your custom components at the top of
// this file. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section. The first import from
// 'react' is required.
import React from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { ButtonSolid } from '@draftbit/ui';
import {
    CardField,
    useConfirmPayment,
    // useStripe,
    // confirmPaymentMethod,
    StripeProvider,
} from '@stripe/stripe-react-native';

// import * as StripeApi from './apis/StripeApi.js';

const PUBLISHABLE_KEY =
    'pk_test_51KfsfFSHaeoWoXPLwF98zLypJcOx9b07eSIHDR5H2vCKPpeL8tdjM4dpQtE12JHgqCMzEIiaxXQCW8YF5guEY3mg00jaSlATFn';

export const StripeApp = () => {
    const [email, setEmail] = React.useState();
    const [cardDetails, setCardDetails] = React.useState();
    // const [loading, setLoading] = React.useState(false);
    const { confirmPayment, loading } = useConfirmPayment();
    // const { confirmPayment } = useStripe();

    const fetchPaymentIntentClientSecret = async() => {
        try {
            // const response = await StripeApi.createIntentPOST({
            //     paymentMethodType: 'card',
            //     currency: 'usd',
            // });

            const response = await fetch(`https://stripe-proxy-test.herokuapp.com/create-payment-intent`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            //   body: "Hello"
              body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'usd',
              }),
            });
            console.log(response)
            const { clientSecret, error } = await response.json();
            return { clientSecret, error };
        } catch (err) {
            console.error(err);
        }
    };

    const handlePayPress = async() => {
        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails?.complete || !email) {
            Alert.alert('Please enter Complete card details and Email');
            return;
        }
        const billingDetails = {
            email: email
        };
        //2.Fetch the intent client secret from the backend
        try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            console.log(clientSecret);
            //2. confirm the payment
            if (error) {
                console.log('Unable to process payment');
            } else {
                const { paymentIntent, error } = await confirmPayment(
                    clientSecret, {
                        type: 'Card',
                        billingDetails: billingDetails,
                    }
                );
                if (error) {
                    console.log('In If ', error.message);
                    alert(`Payment Confirmation Error ${error.message}`);
                } else if (paymentIntent) {
                    alert('Payment Successful');
                    console.log('Payment successful ', paymentIntent);
                }
            }
        } catch (e) {
            console.log(e);
        }
        //3.Confirm the payment with the card details
    };
    return ( 
    <StripeProvider publishableKey = { PUBLISHABLE_KEY } >
        <View style = { styles.container } >
        <TextInput autoCapitalize = "none"
        placeholder = "E-mail"
        keyboardType = "email-address"
        onChange = { value => setEmail(value.nativeEvent.text) }
        style = { styles.input }
        /> 
        <CardField postalCodeEnabled = { true }
        placeholder = {
            {
                number: '4242 4242 4242 4242',
            }
        }
        cardStyle = { styles.card }
        style = { styles.cardContainer }
        onCardChange = {
            cardDetails => {
                setCardDetails(cardDetails);
            }
        }
        /> 
        <ButtonSolid 
            onPress = { handlePayPress }
            title = { 'Pay' }
            disabled = { loading }
        /> 
        </View> 
        </StripeProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20,
        width: '100%',
    },
    input: {
        backgroundColor: '#efefefef',

        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
    },
    card: {
        backgroundColor: '#efefefef',
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
});