import React from 'react';
import * as CustomCode from '../components.js';
import * as Utils from '../utils';
import { ScreenContainer } from '@draftbit/ui';
import { StyleSheet, View } from 'react-native';

const PaymentScreen = props => {
  const { navigation } = props;
  return (
    <ScreenContainer>
      <View style={styles.ViewEt} pointerEvents={'auto'}>
        <Utils.CustomCodeErrorBoundary>
          <CustomCode.StripeApp navigation = {navigation} />
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
