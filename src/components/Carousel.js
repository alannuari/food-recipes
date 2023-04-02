import React, {useState} from 'react';
import {
  ScrollView,
  Image,
  View,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';

const {width} = Dimensions.get('window');
const height = width * 0.5;

const images = [
  'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://plus.unsplash.com/premium_photo-1669996577933-286a29cbf9dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
];

const messages = [
  'Welcome to Food Recipes',
  'Crete Your Recipe',
  'Be Smart',
  'Happy Cooking',
];

const Carousel = () => {
  const [active, setActive] = useState(0);

  const changeHandler = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={e => changeHandler(e)}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        {images.map((item, idx) => (
          <View key={idx}>
            <Image
              source={{
                uri: item,
              }}
              style={styles.image}
            />
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                top: 0,
                left: 0,
                alignSelf: 'center',
                padding: 16,
                backgroundColor: 'rgba(100, 100, 100, 0.5)',
                borderBottomRightRadius: 20,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {messages[idx]}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {images.map((item, idx) => (
          <Text
            key={idx}
            style={{
              ...styles.pagingText,
              color: active === idx ? '#fff' : '#888',
            }}>
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    width,
    marginBottom: 10,
  },
  scroll: {
    width,
    height,
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 5,
  },
  pagingText: {
    marginHorizontal: 4,
    fontSize: width / 25,
  },
});

export default Carousel;
