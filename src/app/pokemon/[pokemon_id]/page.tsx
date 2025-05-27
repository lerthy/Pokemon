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
    async function fetchAllPokemon() {
        let url = "/api/pokemon";
        let allItems: Pokemon[] = [];
        const seenPages = new Set();

        while (url && allItems.length < 200) { // Increase limit if needed
            const resp = await fetch(url);
            const data = await resp.json();
            allItems = allItems.concat(data.items);

            if (data.nextPage) {
                if (seenPages.has(data.nextPage)) break;
                seenPages.add(data.nextPage);
                url = `/api/pokemon?page=${encodeURIComponent(data.nextPage)}`;
            } else {
                url = "";
            }
        }
        return allItems;
    }

    async function fetchPokemon() {
        const allPokemon = await fetchAllPokemon();
        const found = allPokemon.find((p: Pokemon) => String(p.pokemonNumber) === String(pokemon_id));
        setPokemon(found);
        setPokemonLoaded(true);
    }
    fetchPokemon().catch(error => {
        console.error(error);
        setPokemonLoaded(true);
    });
  }, [pokemon_id]);


  return (
       <>
           <PokeNavBar></PokeNavBar>
           {
               isPokemonLoaded ?
                   pokemon ?
                       <PokemonComponent pokemon={pokemon}></PokemonComponent> :
                       <Image className='img-fluid mx-auto d-block rounded'
                           src="https://cdn.dribbble.com/users/2805817/screenshots/13206178/media/6bd36939f8a01d4480cb1e08147e20f3.png"
                           alt="Not found"
                       /> :
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
