import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { StyleSheet, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const SuccessScreen = props => {
  const { theme } = props;
  const [successMessage, setSuccessMessage] = React.useState('Congratulations!');
  
  const {paymentIntent} = props.route.params;

  useFocusEffect(() => {
    setSuccessMessage(`Received ${(paymentIntent.amount/100).toFixed(2)} ${paymentIntent.currency.toUpperCase()} \n\nfrom ${paymentIntent.shipping.name}\n\nfor ${paymentIntent.description}!`)
  })

  return (
    <ScreenContainer style={styles.screen}>
      <Text style={[styles.Textla, { color: theme.colors.strong }]}>
        {successMessage}
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Textla: {
    fontSize: 20,
    fontFamily: 'AdventPro_600SemiBold',
  },
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(SuccessScreen);
