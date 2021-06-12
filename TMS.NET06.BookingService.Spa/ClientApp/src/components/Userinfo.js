import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
            return <p><em>Ваша запись принята в обработку</em></p>
        }
        else {
            return (
            <Form>
                <FormGroup>
                    <Label for="UserName">UserName</Label>
                    <Input type="text" name="UserName" id="UserName" placeholder="Введите Имя" />
                </FormGroup>
                <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input type="email" name="email" id="Email" placeholder="Введите email" />
                </FormGroup>
                <FormGroup>
                    <Label for="Description">Description</Label>
                    <Input type="textarea" name="Description" id="Description" placeholder="Введите описание" />
                </FormGroup>
                <FormGroup>
                    <Button color="primary"
                        onClick={() =>
                            this.addBookingEntry({
                                userName: document.getElementById("UserName").value,
                                email: document.getElementById("Email").value,
                                description: document.getElementById("Description").value
                            })}>Подтвердить</Button>{' '}
                </FormGroup>
            </Form>
            )
        }
    }
}