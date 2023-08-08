import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { styles } from '../theme'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../api/moviedb'


const { width, height } = Dimensions.get('window');

const MovieLists = ({ title, data, hideSeeAll }) => {
  let movieName = 'Ant-Man and the Wasp: Quantumanim'
  const navigation = useNavigation()
  
   

  return (
    <View className="mb-4 space-y-2">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">
          {title}
        </Text>
        {
          !hideSeeAll && <TouchableOpacity>
          <Text style={styles.text} className="text-lg">
            See All
          </Text>
        </TouchableOpacity>
        }
      </View>
      <ScrollView
        horizontal
        showHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 15 }}
      >
        {
          data.map((item, index) => {
            
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate('Movie', item)}
              >
                
                <View className="space-y-2 mr-4">
                  <Image style={{ width: width * 0.33, height: height * 0.22 }} className='rounded-3xl' source={{uri:image185(item.poster_path || fallbackMoviePoster)}} />
                  <Text className="text-neutral-300 text-center ml-1">
                    {item.title.length > 14?
                    item.title.slice(0,14) + '....' : item.title
                    }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default MovieLists