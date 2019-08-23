import React, { Component } from 'react';

export default class ParkingLotMover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialLot: null,
            intermediateStates: null,
            finishedLot: null
        }

        this.onClick = this.onClick.bind(this);
        this.moveCars = this.moveCars.bind(this);
    }

    moveCars() {
        // car moving algorithm
        // with each movement print state
        console.log('moving');
    }

    onClick() {
        // clear intermediate states on new request
        console.log('processing');
        // call move cars function
        // supply move cars with initial and final state
        // print steps to text area
    }

    render() {
        return(
            <div>
                Provide initial and final states of the parking lot
                <input></input>
                <button onClick={this.onClick}>Submit</button>
                <textarea></textarea>
            </div>
        );
    }

}