import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {SPACING} from '../../../constants/spacing';
import Input from '../../../components/common/Input';

interface HomeHeaderProps {
  location: string;
  onSearch: (query: string) => void;
  onLocationPress: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  location,
  onSearch,
  onLocationPress,
}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={onLocationPress} 
        style={styles.locationContainer}
      >
        <Text style={styles.locationLabel}>Location</Text>
        <Text style={styles.locationValue} numberOfLines={1}>
          {location}
        </Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search"
          onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
          containerStyle={styles.inputStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  locationContainer: {
    marginBottom: SPACING.sm,
  },
  locationLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  locationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  searchContainer: {
    marginTop: SPACING.xs,
  },
  inputStyle: {
    marginBottom: 0,
  },
});

export default HomeHeader;
