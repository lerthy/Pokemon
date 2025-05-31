"use client";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

export default function AboutPage() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <Row className="mb-4 mt-5">
        <Col className="text-center">
          <Image
            src="https://vanilla-web-pokedex.pages.dev/assets/images/pokedex-logo.png"
            alt="Pokedex"
            fluid
            style={{ maxHeight: "180px" }}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="text-center">
          <h1>Welcome to the Pokédex!</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Text style={{ fontSize: "1.2rem" }}>
                This website is your ultimate Pokédex companion! Browse, search, and discover detailed information about your favorite Pokémon. Whether you're a seasoned trainer or just starting your journey, our Pokédex provides images, stats, and fun facts for every Pokémon. Dive in and explore the world of Pokémon!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 