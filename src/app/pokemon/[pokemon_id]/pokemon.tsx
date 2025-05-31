import Pokemon from "@/model/pokemon";
import { Row, Col, Container, Card } from 'react-bootstrap';

type Props = {
  pokemon: Pokemon;
};

const statColors: Record<string, string> = {
  speed: "#00cfff",
  healthPoints: "#ff3b3b",
  attack: "#ffb300",
  defense: "#4caf50",
};

export default function PokemonComponent(props: Props) {
  const { pokemon } = props;

  return (
    <Container className="py-4">
      <Row className="justify-content-md-center mb-4">
        <Col md="auto">
          <h1 style={{ fontWeight: 800, fontSize: '2.8rem', color: '#2a75bb', letterSpacing: 1 }} className="pokemon-title fade-in">
            {pokemon.pokemonName}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={5} className="d-flex align-items-center justify-content-center mb-4 mb-md-0">
          <img
            src={pokemon.mainImage}
            alt={pokemon.pokemonName}
            className="pokemon-main-img fade-in-image"
            style={{
              background: '#f8f9fa',
              borderRadius: '2rem',
              maxWidth: '100%',
              maxHeight: '70vh',
              width: '100%',
              height: 'auto',
              boxShadow: '0 4px 24px rgba(42,117,187,0.10)',
              objectFit: 'contain',
            }}
          />
        </Col>
        <Col xs={12} md={7}>
          <Card className="shadow-sm mb-3 border-0 fade-in minimal-section" style={{ borderRadius: '1.5rem', background: '#fff' }}>
            <Card.Body>
              <Card.Title as="h5" className="mb-3" style={{ color: '#ffb300', fontWeight: 700 }}>Stats</Card.Title>
              {[
                { label: "Speed", value: pokemon.speed, color: statColors.speed },
                { label: "Health points", value: pokemon.healthPoints, color: statColors.healthPoints },
                { label: "Attack", value: pokemon.attack, color: statColors.attack },
                { label: "Defense", value: pokemon.defense, color: statColors.defense },
              ].map(stat => (
                <div key={stat.label} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span><b>{stat.label}:</b></span>
                    <span>{stat.value}</span>
                  </div>
                  <div style={{ background: '#f0f0f0', borderRadius: 6, height: 8, width: '100%' }}>
                    <div style={{ width: `${stat.value}%`, background: stat.color, height: 8, borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card className="shadow-sm mb-3 border-0 fade-in minimal-section" style={{ borderRadius: '1.5rem', background: '#fff' }}>
            <Card.Body>
              <Card.Title as="h5" className="mb-2" style={{ color: '#00cfff', fontWeight: 700 }}>Pokémon Type</Card.Title>
              {pokemon.pokemonType?.map(type => (
                <span key={type} className={`minimal-type-badge minimal-type-badge-${type.toLowerCase()} me-2`}>{type}</span>
              )) || <span>Unknown</span>}
            </Card.Body>
          </Card>
          <Card className="shadow-sm border-0 fade-in minimal-section" style={{ borderRadius: '1.5rem', background: '#fff' }}>
            <Card.Body>
              <Card.Title as="h5" className="mb-2" style={{ color: '#4caf50', fontWeight: 700 }}>Evolution Family</Card.Title>
              <div>
                {pokemon.devolution && (
                  <span className="minimal-evo-badge minimal-evo-badge-devolution me-2">{pokemon.devolution} Devolution</span>
                )}
                <span className="minimal-evo-badge minimal-evo-badge-current me-2">{pokemon.pokemonName} Current</span>
                {pokemon.evolution && (
                  <span className="minimal-evo-badge minimal-evo-badge-evolution">{pokemon.evolution} Evolution</span>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
