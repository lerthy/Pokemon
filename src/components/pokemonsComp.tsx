"use client";


import Container from "react-bootstrap/Container";
import PokemonCard from "@/model/pokemonCard";
import { Row, Col } from "react-bootstrap";
import PokemonCardComp from "@/components/pokemonCardComp";




interface PokemonsCompProps {
   pokemons: PokemonCard[];
}


export default function PokemonsComp(props: PokemonsCompProps) {
   return (
       <div className="main-pokemon-bg" style={{ minHeight: '100vh', width: '100%', padding: '0', margin: '0' }}>
           <Container className="pt-5 pb-5">
               <Row xs={1} md={3} lg={5} className="g-4 justify-content-center">
                   {props.pokemons.map((pokemon) => (
                       <Col key={pokemon.pokemonNumber} className="d-flex align-items-stretch">
                           <PokemonCardComp pokemon={pokemon}/>
                       </Col>
                   ))}
               </Row>
           </Container>
       </div>
   );
}
