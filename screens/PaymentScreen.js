import React from 'react';
import * as Utils from '../utils';
import { ScreenContainer } from '@draftbit/ui';
import { StyleSheet, View } from 'react-native';
import { StripeApp } from './StripeApp';

const PaymentScreen = props => {
  const { navigation } = props;
  const {amount} = props.route.params;
  return (
    <ScreenContainer>
      <View style={styles.ViewEt} pointerEvents={'auto'}>
        <Utils.CustomCodeErrorBoundary>
          <StripeApp navigation = {navigation} amount = {amount} />
        </Utils.CustomCodeErrorBoundary>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  ViewEt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PaymentScreen;
