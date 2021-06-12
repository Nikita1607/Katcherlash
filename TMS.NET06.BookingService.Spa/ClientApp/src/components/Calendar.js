import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import setDate from "date-fns/setDate";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import 'react-datepicker/dist/react-datepicker.css'

export class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { availableDates: null, availableTimes:[], selectedDate: new Date() };
        this.serviceId = this.props.serviceId;

        this.setDate = this.setDate.bind(this);
    }

    async componentDidMount() {
        await this.populateAvailableDates();
    }

    render() {
        return (
            <div>
                <h1>Select Date</h1>
                {this.state.availableDates == null
                    ? <div>Our neural network is processing you data...</div>
                    : <DatePicker
                        showTimeSelect
                        strictParsing
                        timeFormat="HH:mm"
                        selected={this.state.selectedDate}
                        onChange={(date) => this.setDate(date)}
                        includeDates={this.state.availableDates}
                        includeTimes={this.state.availableTimes}
                        inline />
                }
            </div>
              //<Button variant="primary">Продолжить</Button>{ ' ' }
        )
    }

    async populateAvailableDates() {
        const response = await fetch('services/availableDates',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serviceId: this.serviceId })
        });
        const data = await response.json();
        const availableDates = data.map(dateString => new Date(dateString));
        this.setState({ availableDates: availableDates, selectedDate: availableDates[0] });
        const selectedDate = availableDates[0];
        this.populateAvailableTimes(selectedDate);

    }

    async populateAvailableTimes(date) {
        const response = await fetch('services/availableTimes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ serviceId: this.serviceId, date: date })
        });
        const data = await response.json();
        this.setState({ availableTimes: data.map(TimeString => setHours(setMinutes(new Date(this.state.selectedDate), parseInt(TimeString.slice(3, 5))), parseInt(TimeString.slice(0, 2))))});
    }

    setDate(date) {
        this.setState({ selectedDate:date });
        this.populateAvailableTimes(date);
        this.props.updateSelectedDate(date);
    }
}