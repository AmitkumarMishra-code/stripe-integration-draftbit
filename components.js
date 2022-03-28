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
    StripeProvider,
} from '@stripe/stripe-react-native';
const API_URL = 'https://stripe-proxy-test.herokuapp.com'

export const StripeApp = () => {
    const [email, setEmail] = React.useState();
    const [cardDetails, setCardDetails] = React.useState();
    const [publishableKey, setPublishableKey] = React.useState(null);
    const { confirmPayment, loading } = useConfirmPayment();

    const getPublishableKey = async() => {
        const response = await fetch(`${API_URL}/get-publishable-key`)
        const {publishableKeyFromServer, error} = await response.json()
        if(error){
            Alert.alert("Something went wrong. Please refresh the page!")
        }
        else{
            setPublishableKey(publishableKeyFromServer)
        }
    }

    React.useEffect(async() => {
        await getPublishableKey()
    }, [])

    const fetchPaymentIntentClientSecret = async() => {
        try {

            const response = await fetch(`${API_URL}/create-payment-intent`, {
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
    <StripeProvider publishableKey = { publishableKey } >
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