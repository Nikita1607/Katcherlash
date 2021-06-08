import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {

    }

    render() {
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
                    <Button color="primary" onClick={() => { this.props.updateUserData(document.getElementById("UserName").value, document.getElementById("Email").value, document.getElementById("Description").value) }}>Подтвердить</Button>{' '}
                </FormGroup>
            </Form>

        )
    }
}