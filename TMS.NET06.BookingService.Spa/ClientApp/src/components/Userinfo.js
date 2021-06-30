import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';


export class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state = { addedBookingEntry: false };
        this.serviceId = this.props.serviceId;
        this.selectedDate = this.props.selectedDate;

        this.addBookingEntry = this.addBookingEntry.bind(this);
    }

    async componentDidMount() {

    }

    async addBookingEntry(userData) {
        const response = await fetch('services/addBookingEntry', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ServiceId: this.serviceId,
                SelectedDate: this.selectedDate,
                Username: userData.userName,
                Email: userData.email,
                Description: userData.description
            })
        });
        const data = await response.json();
        if (data == true) this.setState({ addedBookingEntry: true });
    }

    render() {
        if (this.state.addedBookingEntry) {
            return (
                <Col sm={12}>
                    <Row>
                        <Col sm={12}>
                            <p><em>Ваша запись принята в обработку</em></p>
                        </Col>
                    </Row>
                    <Row>
                        <ul>
                            <NavItem>
                                <NavItem tag={Link} to="/">Вернуться наглавную</NavItem>
                            </NavItem>
                        </ul>
                    </Row>
                </Col>
            )
        }
        else {
            return (
            <Form>
                <FormGroup>
                        <Label for="UserName">Введите ваше Имя</Label>
                        <Input type="text" name="UserName" id="UserName" placeholder="Ваше Имя" />
                </FormGroup>
                <FormGroup>
                    <Label for="Email">Введите вашу электронную почту</Label>
                    <Input type="Phone" name="email" id="Email" placeholder="Ваш e-mail" /> 
                </FormGroup>
                <FormGroup>
                    <Label for="Description">Комментарий</Label>
                    <Input type="textarea" name="Description" id="Description" placeholder="Оставьте ваш комментарий к записи" />
                </FormGroup>
                <FormGroup>
                    <Button color="primary"
                        onClick={() =>
                            this.addBookingEntry({
                                userName: document.getElementById("UserName").value,
                                email: document.getElementById("Email").value,
                                description: document.getElementById("Description").value
                            })}>Записаться</Button>{' '}
                </FormGroup>
            </Form>
            )
        }
    }
}