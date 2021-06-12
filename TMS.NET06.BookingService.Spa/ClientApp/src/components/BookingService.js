import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Calendar } from './Calendar';
import { Userinfo } from './Userinfo';

export class BookingService extends Component {

    constructor(props) {
        super(props);
        this.state = { services: [], loading: true, selectedServiceId: null, selectedDate: null, activeUserinfo: false, userName: null, email: null, description: null };

        this.openPageUserinfo = this.openPageUserinfo.bind(this);
    }

    updateSelectedDate = (value) => {
        this.setState({ selectedDate: value })
    }

    selectService(service) {
        this.setState({ selectedServiceId: service.serviceId });
    }

    openPageUserinfo(selectData) {
        this.setState({ activeUserinfo: true })
    }

    componentDidMount() {
        this.populateServices();
    }

    render() {
        if (this.state.loading){
            return <p><em>Загрузка.Подождите...</em></p>
        }

        if (this.state.selectedServiceId) {

            if (this.state.activeUserinfo) {
                return (
                    <Container>
                        <Row>
                            <Col>
                                <Userinfo serviceId={this.state.selectedServiceId} selectedDate={this.state.selectedDate} />
                            </Col>
                        </Row>
                    </Container>
                )
            }
            else {
                return (
                    <Container>
                        <Row>
                            <Col>
                                <Calendar serviceId={this.state.selectedServiceId} updateSelectedDate={this.updateSelectedDate} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="primary" onClick={() => this.openPageUserinfo({ serviceId: this.state.selectedServiceId, selectedDate: this.state.selectedDate })}>Подтвердить</Button>{' '}
                            </Col>
                        </Row>
                    </Container>
                )
            }
        }
        if (this.state.seletedTime) {
            return (<Userinfo serviceId={this.state.selectedServiceId} />)
           
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <h2>KatcherLash</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                    {this.state.services.map(service =>
                        <ListGroupItem key={service.serviceId} tag="button" onClick={() => this.selectService(service)}>{service.name}</ListGroupItem>
                    )}                            
                       </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }

    async populateServices() {        
        const response = await fetch('services');
        const data = await response.json();        
        this.setState({ services: data, loading: false });
    }
}