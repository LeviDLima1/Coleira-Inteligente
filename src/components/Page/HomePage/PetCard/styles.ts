import { StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.gray[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  slideContainer: {
    flexGrow: 0,
  },
  petInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: colors.gray[100],
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  petTextContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gray[800],
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  id: {
    fontSize: 12,
    color: colors.gray[500],
    fontStyle: 'italic',
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: 12,
  },
  iconButton: {
    padding: 8,
  },
}); 