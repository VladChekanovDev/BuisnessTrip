import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

const BuisnessTrip = sequelize.define('buisnessTrip', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    dateOfBegin: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    goal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    getterMethods: {
        getDay() {
            return (this.orderDate) ? this.orderDate.substr(9,2) : '';
        },
        getMonth() {
            if (this.orderDate) {
                switch(this.orderDate.substr(5,2)) {
                    case '01': return 'января'
                    case '02': return 'февраля'
                    case '03': return 'марта'
                    case '04': return 'апреля'
                    case '05': return 'мая'
                    case '06': return 'июня'
                    case '07': return 'июля'
                    case '08': return 'августа'
                    case '09': return 'сентября'
                    case '10': return 'октября'
                    case '11': return 'ноября'
                    case '12': return 'декабря'
                    default: return ''
                }
            } else return
        },
        getYear() {
            return (this.orderDate) ? this.orderDate.substr(2,2) : '';
        },
        getBeginDay() {
            return (this.dateOfBegin) ? this.dateOfBegin.substr(9,2) : '';
        },
        getBeginMonth() {
            if (this.dateOfBegin) {
                switch(this.dateOfBegin.substr(5,2)) {
                    case '01': return 'января'
                    case '02': return 'февраля'
                    case '03': return 'марта'
                    case '04': return 'апреля'
                    case '05': return 'мая'
                    case '06': return 'июня'
                    case '07': return 'июля'
                    case '08': return 'августа'
                    case '09': return 'сентября'
                    case '10': return 'октября'
                    case '11': return 'ноября'
                    case '12': return 'декабря'
                }                
            } else return ''
        },
        getBeginYear() {
            return (this.dateOfBegin) ? this.dateOfBegin.substr(2,2) : '';
        }
    }
});

export default BuisnessTrip;