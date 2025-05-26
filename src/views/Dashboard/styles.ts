import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 60,
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    label: {
      alignSelf: 'flex-start',
      fontSize: 16,
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      padding: 10,
      marginBottom: 10,
    },
    summary: {
      fontSize: 16,
      marginVertical: 5,
    },
    noData: {
      marginTop: 20,
      fontStyle: 'italic',
      color: '#888',
    },
  });
  