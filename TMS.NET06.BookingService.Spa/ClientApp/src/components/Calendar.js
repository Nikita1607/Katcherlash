import React, { Component } from 'react';
import setDate from "date-fns/setDate";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ru } from "date-fns/locale/ru/index.js";
import { Row, Col } from 'reactstrap';
import './Calendar.css';
registerLocale('ru', ru);
setDefaultLocale('ru');

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const locale = {
    localize: {
        month: n => months[n],
        day: n => days[n]
    },
    formatLong: {}
};

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
            <Row>
                <div>
                <h1>Выберите дату</h1>
                {this.state.availableDates == null
                    ? <div>Подождите.Идет загрузка...</div>
                    : <DatePicker
                        showTimeSelect
                        timeIntervals={60}        
                        timeFormat="HH:mm"
                        //formatWeekDay={ru}
                            locale={locale}
                            
                        selected={this.state.selectedDate}
                        onChange={(date) => this.setDate(date)}
                        includeDates={this.state.availableDates}
                        includeTimes={this.state.availableTimes}
                            inline />
                      
                }
                </div>
                </Row>
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
        //this.setState({ availableTimes: data.map(TimeString => setHours(setMinutes(new Date(this.state.selectedDate), parseInt(TimeString.slice(3, 5))), parseInt(TimeString.slice(0, 2))))});
        this.setState({ availableTimes: data.map(dateString => this.convertUTCToLocalDateIgnoringTimezone(dateString)) });
    }

    convertUTCToLocalDateIgnoringTimezone(dateString) {
        var date = new Date(dateString);
        return new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            date.getUTCMilliseconds(),
        );
    }

    setDate(date) {
        this.setState({ selectedDate:date });
        this.populateAvailableTimes(date);
        this.props.updateSelectedDate(date);
    }
}