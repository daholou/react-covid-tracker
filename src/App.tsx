import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {CovidTracker} from "./components/CovidTracker";
import Header from "./components/Header";
import {
    Container,
    Row,
    Col,
    ListGroup,
    Button,
    ButtonGroup
} from "react-bootstrap";

export default function App()
{
    return (
        <div className="app-frame">
            <Header/>
            <CovidTracker/>
            {/*<Container fluid className="container-app">*/}
            {/*    <Row>*/}
            {/*        <Col className='col-graph-view'>*/}
            {/*            <h2>GraphView</h2>*/}
            {/*            <p>Sed ut perspiciatis, unde omnis iste natus error sit*/}
            {/*                voluptatem accusantium doloremque laudantium, totam*/}
            {/*                rem aperiam eaque ipsa, quae ab illo inventore*/}
            {/*                veritatis*/}
            {/*                et quasi architecto beatae vitae dicta sunt,*/}
            {/*                explicabo.*/}
            {/*                Nemo enim ipsam voluptatem, quia voluptas sit,*/}
            {/*                aspernatur*/}
            {/*                aut odit aut fugit, sed quia consequuntur magni*/}
            {/*                dolores*/}
            {/*                eos, qui ratione voluptatem sequi nesciunt, neque*/}
            {/*                porro*/}
            {/*                quisquam est, repellendus. Temporibus autem*/}
            {/*                quibusdam et aut officiis debitis aut rerum*/}
            {/*                necessitatibus saepe*/}
            {/*                eveniet, ut et voluptates repudiandae sint et*/}
            {/*                molestiae non recusandae. Itaque earum rerum hic*/}
            {/*                tenetur a*/}
            {/*                sapiente delectus, ut aut reiciendis voluptatibus*/}
            {/*                maiores*/}
            {/*                alias consequatur aut perferendis doloribus*/}
            {/*                asperiores*/}
            {/*                repellat.</p>*/}
            {/*        </Col>*/}
            {/*        <Col sm={2} className='col-country'>*/}
            {/*            <div className='head-country'>*/}
            {/*                <h2>Country Filter</h2>*/}
            {/*                <ButtonGroup>*/}
            {/*                    <Button>Hey</Button>*/}
            {/*                    <Button>Hey</Button>*/}
            {/*                </ButtonGroup>*/}
            {/*            </div>*/}
            {/*            <ListGroup className='body-country'>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*                <ListGroup.Item>dededazazazeded</ListGroup.Item>*/}
            {/*            </ListGroup>*/}
            {/*        </Col>*/}
            {/*    </Row>*/}
            {/*</Container>*/}


        </div>
    );
}

