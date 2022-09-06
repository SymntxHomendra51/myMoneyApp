import { StyleSheet } from 'react-native'

// import {dimensions} from '../../shared';

const makeStyle = theme => {
  //   const {width, height} = dimensions.window;

  const { primary, alterText } = theme.colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  })
  return styles
}

export default makeStyle
