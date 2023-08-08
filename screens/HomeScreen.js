import { View, Text, TouchableOpacity,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import {styles} from '../theme'
import TrendingMovies from '../components/TrendingMovies'
import MovieLists from '../components/MovieLists'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { fetchTrendingMovies,fetchTopRatedMovies,fetchUpcommingMovies } from '../api/moviedb'
import { useEffect } from 'react'


import { useState } from 'react'

const ios = Platform.OS === 'ios'

const HomeScreen = () => {
  const [trendingMovies,setTrendingMovies] = useState([])
  const[upcommingMovies,setUpcommingMoves] = useState([])
  const[topRatedMovies,setTopRatedMovies]  = useState([])
 const navigation = useNavigation()
 const [loading,setLoading] = useState(true)


 useEffect(()=>{
    getTrendingMovies()
    getUpCommingMovies()
    getTopRatedMovies()
},[])

 const getTrendingMovies = async() => {
  const data = await fetchTrendingMovies();
  if(data && data.results){
    setTrendingMovies(data.results)
    setLoading(false)
  } 
 }

 const getUpCommingMovies = async() => {
  const data = await fetchUpcommingMovies();
  if(data && data.results){
    setUpcommingMoves(data.results)
    setLoading(false)
  } 
 }

 const getTopRatedMovies = async() => {
  const data = await fetchTopRatedMovies();
  if(data && data.results){
    setTopRatedMovies(data.results)
    setLoading(false)
  } 
 }

  return (
    <View className=' flex-1 bg-neutral-800'>
      {/* search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style='light' />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
            </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            {/* Trendcing movies carousel */}
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading ? (
             <Loading/>
        ):(
          <ScrollView
          showVerticalScrollIndocator={false}
          contentContainerStyle={{paddingBottom:30}}
        >
          {/* Trending Movies */}
         {
          trendingMovies.length > 0 && <TrendingMovies data={trendingMovies}/>
         }
  
         {/* upcomming movies */}
         <MovieLists title="upcomming" data={upcommingMovies}/>
  
         {/* upcomming movies */}
         <MovieLists title="Top Rated" data={topRatedMovies}/>
        </ScrollView>
        )
      }
      
    </View>
  )
}

export default HomeScreen