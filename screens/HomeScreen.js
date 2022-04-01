import React from 'react';
import {
  ButtonSolid,
  NumberInput,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = props => {
  const { theme } = props;
  const { navigation } = props;

  const [numberInputValue, setNumberInputValue] = React.useState('');

  return (
    <ScreenContainer>
      <View style={styles.ViewTS} pointerEvents={'auto'}>
        <Text style={[styles.Text_0Z, { color: theme.colors.strong }]}>
          {'Enter the amount and click Buy Now'}
        </Text>

        <View style={styles.ViewZ6} pointerEvents={'auto'}>
          <Text style={[styles.Textjn, { color: theme.colors.strong }]}>
            {'Amount (in USD)'}
          </Text>
          <NumberInput
            onChangeText={newNumberInputValue => {
              const numberInputValue = newNumberInputValue;
              try {
                setNumberInputValue(newNumberInputValue);
              } catch (err) {
                console.error(err);
              }
            }}
            style={[
              styles.NumberInputJn,
              { borderColor: theme.colors.divider },
            ]}
            value={numberInputValue}
            placeholder={'Enter a number...'}
            keyboardType={'numeric'}
          />
        </View>
        <ButtonSolid
          onPress={() => {
            try {
              navigation.navigate('PaymentScreen', {
                amount: numberInputValue,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          style={[
            styles.ButtonSolidxW,
            { backgroundColor: theme.colors.primary },
          ]}
          title={'Buy Now'}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  Text_0Z: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 40,
  },
  Textjn: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
  },
  NumberInputJn: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
  },
  ViewZ6: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    width: '100%',
  },
  ButtonSolidxW: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '700',
    textAlign: 'center',
  },
  ViewTS: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(HomeScreen);
