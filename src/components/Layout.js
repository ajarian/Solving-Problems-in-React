import React, { Component } from 'react';

import ParkingLotMover from './ParkingLotMover';
import SalesGraphWidget from './SalesGraphWidget';

const SALES_GRAPH = 1;
const PARKING = 2;

export default class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentChallenge: SALES_GRAPH
        }

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        let nextChallenge;

        if (this.state.currentChallenge === SALES_GRAPH) {
            nextChallenge = PARKING;
        } else if (this.state.currentChallenge === PARKING) {
            nextChallenge = SALES_GRAPH;
        }

        this.setState({ currentChallenge: nextChallenge });
    }

    render() {
        let currentChallenge = this.state.currentChallenge;

        return (
            <div>
                <header className="App-header">
                </header>
                { currentChallenge === SALES_GRAPH &&
                    <SalesGraphWidget></SalesGraphWidget>
                }
                { currentChallenge === PARKING &&
                    <ParkingLotMover></ParkingLotMover>
                }

                <button style={{marginTop: '20px'}} onClick={this.onClick}>
                    Show {currentChallenge === SALES_GRAPH ? 'Parking Challenge' : 'Graph Challenge' }
                </button>
            </div>
        )
    }
}