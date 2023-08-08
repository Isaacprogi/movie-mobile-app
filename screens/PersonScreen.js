import { View, Text, Platform, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, theme } from '../theme'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import MovieLists from '../components/MovieLists'
import Loading from '../components/loading'
import { fallbackMoviePoster, fetchPersonDetails ,fetchPersonMovies} from '../api/moviedb'
import { useEffect } from 'react'
import { image342 } from '../api/moviedb'

const { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios'
const verticalMargin = ios ? '' : 'my-3'




const PersonScreen = () => {
  const {params:item} = useRoute()
  const [isFavourite, toggleFavourite] = useState(false)
  const navigation = useNavigation()

  const[loading,setLoading] = useState(false)
  const [personMovies, setPersonMovies] = useState([])
  const [person,setPerson] = useState([])

  useEffect(()=>{
     setLoading(true)
     getPersonDetails(item.id)
     getPersonMovies(item.id)
  },[item])

  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id)
    if(data) setPerson(data) 
    setLoading(false)
  }

  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id)
    if(data && data.cast) setPersonMovies(data.cast) 
    setLoading(false)
  }

  return (
    <ScrollView className='flex-1 bg-neutral-900'
      contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
    >
      {/* back button */}
      <SafeAreaView style={{ paddingHorizontal: 4 }} className={'w-full z-20  flex-row justify-between items-center px-4 ' + verticalMargin}>
        <TouchableOpacity onPress={(()=>navigation.goBack())} style={styles.background} className='rounded-xl p-1'>
          <ChevronLeftIcon size='28' srokeWidth={2.5} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} className='rounded-xl p-1'>
          <HeartIcon size='35' color={isFavourite ? theme.background : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
       
       {
        loading ? (
          <Loading/>
        ) : (
       <View>
        <View className='flex-row justify-center'
        style={{
          shadowColor: 'gray',
          shadowRadius: 40,
          shadowOffset: {
            width: 0, height: 5
          },
          shadowOpacity: 1,
          elevation: 5

        }}
      >
        <View className='justify-center rounded-full  overflow-hidden h-72 w-72 border border-neutral-500'>
          <Image
            style={{ height: height * 0.43, width: width * 0.74 }}
            source={{uri:image342(person?.profile_path)  || fallbackMoviePoster}} />
        </View>

      </View>
      <View className="mt-6">
        <Text className="text-3xl text-white font-bold text-center">
          {person.name}
        </Text>
        <Text className="texy-base text-neutral-500 font-bold text-center">
          {person?.place_of_birth}
        </Text>

      </View>
      <View className="mx-3 mt-6 p-4 rounded-full flex-row justify-between items-center bg-neutral-700">
        <View className="border-r-2 items-center px-2  border-r-neutral-400">
          <Text className="text-white font-semibold">
            Gender
          </Text>
          <Text className=" text-sm text-neutral-400 font-semibold">
            {person?.gender == 1? 'Female': 'Male'}
          </Text>
        </View>
        <View className="border-r-2 items-center px-2  border-r-neutral-400">
          <Text className="text-white font-semibold">
            Birthday
          </Text>
          <Text className=" text-sm text-neutral-400 font-semibold">
            {person?.birthday}
          </Text>
        </View>
        <View className="border-r-2 items-center px-2  border-r-neutral-400">
          <Text className="font-semi-bold text-white">
            Known for
          </Text>
          <Text className="text-sm text-neutral-400 font-semibold">
            {person?.known_for_department}
          </Text>
        </View>
        <View className="items-center px-2 ">
          <Text className="text-white font-semibold">
            Popularity
          </Text>
          <Text className=" text-sm text-neutral-400 font-semibold">
            {person?.popularity?.toFixed(2)} %
          </Text>
        </View>
      </View>
      <View  className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">
            Biography
          </Text>
          <Text className="text-neutral-400">
            {
              person.biography || 'N/A'
            }
          </Text>
      </View>
         
         {/* movies */}
         <MovieLists title={'Movies'} hideSeeAll={true} data={personMovies}/>
         
       </View>

        )
       }
      
    </ScrollView>
  )
}

export default PersonScreen