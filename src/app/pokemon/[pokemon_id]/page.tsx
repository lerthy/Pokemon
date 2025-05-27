'use client'
import Pokemon from '@/model/pokemon';
import { use, useEffect, useState } from 'react';
import { Container, Image, Spinner, Row } from 'react-bootstrap';
import PokemonComponent from './pokemon';
import PokeNavBar from '@/components/pokeNavBarComp'


type Params = {
  params: Promise<{ pokemon_id: string }>
}


export default function PokemonPage({ params }: Params) {
  const {pokemon_id} = use(params);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isPokemonLoaded, setPokemonLoaded] = useState(false);


  useEffect(() => {
      const fetchData = async () => {
          const resp = await fetch('/pokemons.json');
          const pokemons: Map<string, Pokemon> = new Map(Object.entries(await resp.json()));
          const currentPokemon = pokemons.get(pokemon_id);
          setPokemon(currentPokemon);
          console.log(currentPokemon);
          setPokemonLoaded(true);
      };


      fetchData()
          .catch(error => {
              console.error(error);
          });
  }, []);


  return (
       <>
           <PokeNavBar></PokeNavBar>
           {
               isPokemonLoaded ?
                   pokemon ?
                       <PokemonComponent pokemon={pokemon}></PokemonComponent> :
                       <Image className='img-fluid mx-auto d-block rounded'
                           src="https://cdn.dribbble.com/users/2805817/screenshots/13206178/media/6bd36939f8a01d4480cb1e08147e20f3.png" /> :
                   <Container>
                       <Row className="justify-content-md-center p-2">
                           <Spinner className='p-2' animation='border' role='status' />
                       </Row>
                       <Row className="justify-content-md-center p-2">
                           Loading Pokémon...
                       </Row>
                   </Container>
           }
       </>
  );
}
