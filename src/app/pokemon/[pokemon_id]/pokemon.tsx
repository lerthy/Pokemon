import Pokemon from "@/model/pokemon";
import { Row, Col, Container, Image, Card, ProgressBar, Badge } from 'react-bootstrap';

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
          <h1 style={{ fontWeight: 700 }}>{pokemon.pokemonName}</h1>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Img variant="top" src={pokemon.mainImage} style={{ background: "#f8f9fa" }} alt={pokemon.pokemonName} />
          </Card>
        </Col>
        <Col md={7}>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title as="h5" className="mb-3">Stats</Card.Title>
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
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: `${stat.value}%`,
                      background: stat.color,
                      height: 10,
                      borderRadius: 8,
                      position: "absolute",
                      left: 0,
                      top: 0,
                      zIndex: 1,
                    }} />
                    <ProgressBar
                      now={Number(stat.value)}
                      max={100}
                      style={{ height: 10, background: "#e9ecef", position: "relative", zIndex: 0 }}
                      variant="custom"
                      className="mb-1"
                    />
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card className="shadow-sm mb-3">
            <Card.Body>
              <Card.Title as="h5" className="mb-2">Pokemon type</Card.Title>
              {pokemon.pokemonType?.map(type => (
                <Badge key={type} bg="info" className="me-2">{type}</Badge>
              )) || <span>Unknown</span>}
            </Card.Body>
          </Card>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title as="h5" className="mb-2">Evaluation family</Card.Title>
              <div>
                {pokemon.devolution && (
                  <Badge bg="danger" className="me-2">{pokemon.devolution} Devolution</Badge>
                )}
                <Badge bg="primary" className="me-2">{pokemon.pokemonName} Current</Badge>
                {pokemon.evolution && (
                  <Badge bg="success">{pokemon.evolution} Evolution</Badge>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
