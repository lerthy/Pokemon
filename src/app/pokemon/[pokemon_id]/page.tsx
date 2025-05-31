'use client'
import Pokemon from '@/model/pokemon';
import { useEffect, useState } from 'react';
import { Container, Image, Spinner, Row } from 'react-bootstrap';
import PokemonComponent from './pokemon';
import './pokemonPage.css';
import { useParams } from 'next/navigation';

export default function PokemonPage() {
  const params = useParams();
  const pokemon_id = params.pokemon_id as string;
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isPokemonLoaded, setPokemonLoaded] = useState(false);

  useEffect(() => {
    async function fetchPokemonFromJson() {
      const resp = await fetch("/pokemons.json");
      const data = await resp.json();
      // pokemon_id may be string or number, so ensure string comparison
      const found = data.find((p: Pokemon) => String(p.pokemonNumber) === String(pokemon_id));
      setPokemon(found);
      setPokemonLoaded(true);
    }
    fetchPokemonFromJson().catch(error => {
      console.error(error);
      setPokemonLoaded(true);
    });
  }, [pokemon_id]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '2rem 0',
      }}
    >
      {
        isPokemonLoaded ? (
          pokemon ? (
            <Container className="d-flex justify-content-center align-items-center fade-in" style={{ minHeight: '80vh' }}>
              <PokemonComponent pokemon={pokemon} />
            </Container>
          ) : (
            <Container className="d-flex flex-column justify-content-center align-items-center fade-in" style={{ minHeight: '80vh' }}>
              <Image
                className="img-fluid mx-auto d-block rounded mb-4"
                src="https://cdn.dribbble.com/users/2805817/screenshots/13206178/media/6bd36939f8a01d4480cb1e08147e20f3.png"
                alt="Not found"
                style={{ maxWidth: '300px', opacity: 0.7 }}
              />
              <h2 className="text-center text-secondary">Pokémon Not Found</h2>
              <p className="text-center">Try searching for another one!</p>
            </Container>
          )
        ) : (
          <Container className="d-flex flex-column justify-content-center align-items-center fade-in" style={{ minHeight: '80vh' }}>
            <Spinner className='p-2' animation='border' role='status' style={{ width: '4rem', height: '4rem', color: '#ffcb05' }} />
            <Row className="justify-content-md-center p-2">
              <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#2a75bb' }}>Loading Pokémon...</span>
            </Row>
          </Container>
        )
      }
    </div>
  );
}
