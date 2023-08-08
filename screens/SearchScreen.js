import { View, Text, Dimensions, Image, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import Loading from '../components/loading'
import { debounce } from 'lodash'
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb'

const { width, height } = Dimensions.get('window')

const SearchScreen = () => {
  const navigation = useNavigation()
  const [results, setResults] = useState([1, 2, 3, 4, 5])
  const movieName = 'Ant-Man and the Wasp Quantumnia'
  const[loading,setLoading] = useState(false)

  const handleSearch = (value) => {
      if(value && value.length > 2){
        setLoading(true)
        searchMovies({
          query:value,
          include_adult:'false',
          language:'en-US',
          page:'1'
        }).then(data=>{
          setLoading(false)
          if(data && data.results) setResults(data.results)
        })
      }else{
        setLoading(false)
        setResults([])
      }
  }
  
  const handleTextDebounce = useCallback(debounce(handleSearch, 400),[])

  return <SafeAreaView className="bg-neutral-800 flex-1">
    <View className="mx-4 mb-3 overflow-hidden rounded-full flex-row justify-between items-center border border-neutral-500">
      <TextInput
        onChangeText={handleTextDebounce}
        placeholder='Search Movie'
        placeholderTextColor={'lightgray'}
        className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
      />
      <TouchableOpacity
        onPress={() => { navigation.navigate('Home') }}
        className="rounded-full p-3 m-1 bg-neutral-500"
      >
        <XMarkIcon size="25" color="white" />
      </TouchableOpacity>
    </View>
    {/* results */}
     {
      loading?(
        <Loading/>
      ):(
          results.length > 0? (
            <ScrollView
          showVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({
              results.length
            })
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {
              results.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => navigation.push('Movie', item)}
                  >
                    <View className="spacey-2 mb-4">
                      <Image className="rounded-3xl"
                        // source={require('../assets/images/moviePoster2.png')}
                        source={{uri:image185(item?.poster_path || fallbackMoviePoster)}}
                        style={{
                          width: width * 0.44,
                          height: height * 0.3
                        }}
                      />
                      <Text className="text-neutral-400 ml-4">
                           {
                            item?.title?.length > 22?
                            item?.title?.slice(0,22) + '...':item?.title
                           }
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })
            }
          </View>
        </ScrollView>
    
          ):(
            <View className="flex-row justify-center">
              <Image 
              className='h-96 w-96'
              source={require('../assets/images/movieTime.png')}/>
                
            </View>
          )
        
      )
     }
    
  </SafeAreaView>
}

export default SearchScreen