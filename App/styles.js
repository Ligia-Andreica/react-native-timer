import { Dimensions, StyleSheet, Platform } from 'react-native'

const BLUE = '#B9AAFF'
const BLACK = '#07121B'
const WHITE = '#FFFFFF'
const ORANGE = '#FF851B'

const screen = Dimensions.get('window')
const buttonSize = screen.width / 2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: BLUE,
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonStop: {
    borderColor: ORANGE,
  },
  buttonText: {
    fontSize: 45,
    color: BLUE,
  },
  buttonTextStop: {
    color: ORANGE,
  },
  timerText: {
    color: WHITE,
    fontSize: 90,
  },
  picker: {
    width: 50,
    ...Platform.select({
      android: {
        color: WHITE,
        backgroundColor: BLACK,
        marginLeft: 10,
      },
    }),
  },
  pickerItem: {
    color: WHITE,
    fontSize: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default styles
