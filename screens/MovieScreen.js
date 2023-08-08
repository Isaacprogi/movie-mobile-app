import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, theme } from '../theme'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? "" : "mt-20"
import Cast from '../components/cast'
import MovieLists from '../components/MovieLists'
import Loading from '../components/loading'
import { fallbackMoviePoster, fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from '../api/moviedb'
import { image500 } from '../api/moviedb'

const MovieScreen = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false)
    const movieName = 'Ant-Man and the Wasp Quantumnia'
    const [cast,setCast] = useState([])
    const [similarMovies,setSimilarMovies] = useState([])
    const[loading,setLoading] = useState(false)
    const[movie,setMovie] = useState([])


    useEffect(()=>{
       setLoading(true)
       getMovieDetails(item.id)
       getMovieCredits(item.id)
       getSimilarMovies(item.id)
    },[item])


    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        if(data) setMovie(data);
        setLoading(false)
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        if(data && data.cast) setCast(data.cast);
      
    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        if(data && data.results) setSimilarMovies(data.results);
      
    }

     
    

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20}}
            className="bg-neutral-900"
        >
            {/* back botton and movie poster */}
            <View className='w-full' >
                <SafeAreaView style={{ paddingHorizontal: 4 }} className={'w-full z-20  absolute flex-row justify-between items-center px-4' + topMargin}>
                    <TouchableOpacity onPress={(()=>navigation.goBack())} style={styles.background} className='rounded-xl p-1'>
                        <ChevronLeftIcon size='28' srokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} className='rounded-xl p-1'>
                        <HeartIcon size='35' color={isFavourite ? theme.background : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                     <Loading/>
                    ):(
                        <View>
                        <Image source={{uri:image500(movie?.poster_path) || fallbackMoviePoster}}
                            style={{ width, height: height * 0.55 }}
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                            style={{ width, height: height * 0.40 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0"
                        />
                    </View>
                    )
                }
                
            </View>
            {/* movie details */}

            <View style={{ marginTop: -(height * 0.09) }} className="spacy-y-3">
                {/* title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movie?.title}
                </Text>
                {/* status,release,runtime */}
                {
                    movie?.id? (
                        <Text className="text-neutral-400 font-semobold text-base text-center">
                    {movie?.status} * {movie?.release_date?.split('-')[0]} - {movie?.runtime} min
                    </Text>
                    ):null
                }

                {/* genres */}
                <View className='flex-row justify-center mx-4 space-x-2'>
                      {
                        movie.genres?.map((genre,index)=>{
                            let showDot = index+1 != movie.genres.length
                              return  <Text key={index} className="text-neutral-400 font-semobold text-base text-center">
                              {genre?.name} {showDot?"*":''}
                         </Text>
                        })
                      }
                </View>

                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                   {
                    movie?.overview
                   }
                </Text>

                  {/* cast */}
           
             {
                cast.length > 0 &&  <Cast navigation={navigation} cast={cast}/>
             }
              
              {/* similar movies */}
               {
                similarMovies?.length > 0 &&
                <MovieLists title='Similar movies' hideSeeAll={true}  data={similarMovies}/>
               }
                   
            </View>

        </ScrollView>
    )
}

export default MovieScreen