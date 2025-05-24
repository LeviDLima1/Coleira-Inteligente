import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '110%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    overflow: 'scroll',
  },
  title: {
    fontSize: 28,
    color: '#7B3FA0',
    fontFamily: 'Jua_400Regular',
  },
  form: {
    backgroundColor: '#E5E5E5',
    borderRadius: 18,
    padding: 24,
    width: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: '#7B3FA0',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 4,
    marginLeft: 12,
    fontFamily: 'Jua_400Regular',
  },
  rowInputs: {
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    fontFamily: 'Jua_400Regular',
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,

    borderWidth: 0,
  },
  loginLinkContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  loginLink: {
    color: '#7B3FA0',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: 'Jua_400Regular',
  },
  button: {
    backgroundColor: '#7B3FA0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Jua_400Regular',
    letterSpacing: 1,
  },
});
