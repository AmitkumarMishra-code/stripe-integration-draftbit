import React from 'react';
import { ScreenContainer, ButtonSolid } from '@draftbit/ui';
import { StyleSheet, View, Text } from 'react-native';

export const SuccessScreen = ({route, navigation}) => {
  const {paymentIntent} = route.params
  return (
    <ScreenContainer>
      <View style={styles.ViewEt} pointerEvents={'auto'}>
        <Text style={styles.TextMain}>
          Payment Successful
        </Text>
        <View>
          <Text style={styles.TextInfo}>
            {`Received ${(paymentIntent.amount/100).toFixed(2)} ${paymentIntent.currency.toUpperCase()} \n\nfrom ${paymentIntent.shipping.name}\n\nfor ${paymentIntent.description}!`}
          </Text>
        </View>
        <ButtonSolid 
            onPress = { () => navigation.navigate("PaymentScreen") }
            title = { 'Back to Payment Screen' }
            style = {styles.Button}
        /> 
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  ViewEt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextMain:{
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10
  },
  TextInfo : {
    textAlign: 'center',
    fontSize: 16
  },
  Button:{
    margin: 15
  }
});

export default SuccessScreen;
