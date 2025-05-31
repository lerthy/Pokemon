'use client'
import PokemonsComp from "@/components/pokemonsComp";
import PokemonCard from "@/model/pokemonCard";
import { useEffect, useState } from "react";
import { Container, Row, Spinner, Form } from "react-bootstrap";


export default function Home() {


 const [pokemons, setPokemons] = useState<PokemonCard[]>();
 const [search, setSearch] = useState("");

 const filteredPokemons = pokemons?.filter((pokemon) => {
   const searchLower = search.toLowerCase();
   return (
     pokemon.pokemonName.toLowerCase().includes(searchLower) ||
     String(pokemon.pokemonNumber).includes(searchLower) ||
     pokemon.pokemonType.some((type: string) => type.toLowerCase().includes(searchLower))
   );
 });

 useEffect(() => {
   async function fetchPokemonsFromJson() {
     const resp = await fetch("/pokemons.json");
     const data = await resp.json();
     // Convert the object to an array and sort by pokemonNumber
     const allItems = (Object.values(data) as PokemonCard[]).sort((a, b) => (a.pokemonNumber - b.pokemonNumber));
     return allItems;
   }

   async function load() {
     try {
       const allPokemon = await fetchPokemonsFromJson();
       setPokemons(allPokemon);
       console.log("Loaded up to 100 Pokémon from pokemons.json:", allPokemon);
     } catch (err) {
       console.error("Failed to load Pokémon from pokemons.json:", err);
       setPokemons([]);
     }
   }
   load();
 }, []);


 return (
   <>
     <div className="main-pokemon-bg" style={{ minHeight: '100vh', width: '100%', padding: '0', margin: '0' }}>
       <Container className="pt-5 pb-5">
         <div className="text-center mb-4">
            
           <img 
             src="https://vanilla-web-pokedex.pages.dev/assets/images/pokedex-logo.png"
             alt="Pokédex Logo"
             className="main-pokedex-logo"
             style={{ maxWidth: '340px', width: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
           />
         </div>
         <Form.Control
           type="text"
           placeholder="Search Pokémon by name, number, or type..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="mb-5 main-pokemon-search"
           aria-label="Search Pokémon"
         />
         {pokemons ?
           <PokemonsComp pokemons={filteredPokemons ?? []}></PokemonsComp> :
           <Container>
             <Row className="justify-content-md-center p-2">
               <Spinner className='p-2' animation='border' role='status' />
             </Row>
             <Row className="justify-content-md-center p-2">
               Loading Pokémons...
             </Row>
           </Container>
         }
       </Container>
     </div>
   </>
 );
}
