"use client";


import PokemonCard from "@/model/pokemonCard";
import { Card } from "react-bootstrap";
import PokemonTypeBadgeComp from "./pokemonTypeBadgeComp";
import Link from "next/link";


interface PokemonCardCompProps {
   pokemon: PokemonCard;
}


export default function PokemonCardComp(props: PokemonCardCompProps) {


   const pokemonUrl = `/pokemon/${props.pokemon.pokemonNumber}`;
   

   return (
       <Link href={pokemonUrl} style={{ textDecoration: "none" }}>
           <Card as="div" style={{ cursor: "pointer" }}>
               <Card.Img variant="top" src={props.pokemon.mainImage} />
               <Card.Body>
                   <Card.Title>{props.pokemon.pokemonName}</Card.Title>
                   <Card.Text>
                       <PokemonTypeBadgeComp pokemonTypes={props.pokemon.pokemonType} />
                   </Card.Text>
               </Card.Body>
           </Card>
       </Link>
   );
}
