import { View, Text, ScrollView , Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { fallbackMoviePoster } from '../api/moviedb';
import { image185 } from '../api/moviedb';

const Cast = ({cast,navigation}) => {
    let personName = 'Keanu Reevs';
    let characterName = 'John Wick';

  return (
    <View className='my-6'>
      <Text className="text-white text-lg mx-4 mb-5 ">
        Top Cast
      </Text>
      <ScrollView
      horizontal
      horizontalshowHorizontalScrollIndicator={false}
      contentContainerStyle={{padding:15}}
      >
        <View className='flex flex-row justify-between'>
          {
            cast && cast.map((person, index)=>{
             return <TouchableOpacity
             onPress={()=>navigation.navigate('Person',person)}
             key={index}
             className="mr-4 items-center"
             >
               <View className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
               <Image
                  className='neutral-2xl h-24 w-20'
                  source={{uri:image185(person?.profile_path) || fallbackMoviePoster}}
                />
               </View>
                <Text className='text-neutral-400 text-xs mt-1'>
                   {
                    person?.character.length > 10 ? person?.character.slice(1,10) + '...' : person.character
                   }
                </Text>
                <Text className='text-neutral-400 text-xs mt-1'>
                   {
                    person.original_name.length > 10 ? person?.original_name.slice(1,10) + '...' : person.original_name
                   }
                </Text>
             </TouchableOpacity>
            })
        }
        </View>
        

      </ScrollView>
     
    </View>
  )
}

export default Cast