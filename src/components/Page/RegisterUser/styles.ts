import { StyleSheet } from 'react-native';
import { colors, spacing, radii, sizes } from '../../../styles/theme';

export const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  form: {
    width: '100%',
    maxWidth: sizes.containerMaxWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: spacing.lg,
    borderRadius: radii.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    color: colors.gray[800],
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  input: {
    width: '100%',
    height: sizes.inputHeight,
    backgroundColor: colors.white,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  button: {
    width: '100%',
    height: sizes.buttonHeight,
    backgroundColor: colors.purple[500],
    borderRadius: radii.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  loginLink: {
    color: colors.purple[500],
    fontSize: 14,
  },
  buttonBack: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.lg,
    zIndex: 1,
  },
  buttonBackText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 