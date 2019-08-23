import React, { Component } from 'react';

export default class ParkingLotMover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialLot: null,
            intermediateStates: null,
            finishedLot: null
        };

        this.compareArrays = this.compareArrays.bind(this);
        this.onClick = this.onClick.bind(this);
        this.moveCars = this.moveCars.bind(this);
        this.shiftCars = this.shiftCars.bind(this);
    }

    componentDidMount() {
        this.moveCars();
    }

    compareArrays(array1, array2) {
        let arraysEqual = true;

        array1.forEach((value, index) => {   
            arraysEqual = array2[index] !== value ? false : arraysEqual;
        });

        return arraysEqual;
    }

    moveCars() {
        let initial = [0,4,2,5,1,3],
            target = [0,1,5,3,2,4];

        // make sure inital and target are the same length
        if (initial.length === target.length) {
            // check to see if initial and target are ordered the same
            let arraysEqual = this.compareArrays(initial, target);

            if (arraysEqual === false) {
                this.shiftCars(initial, target);
            }
        }
    }

    reportVehicleMovement(car, newSpace) {
        let statement = `Moved ${car} to ${newSpace}.`;
    }

    shiftCars(initial, target) {
        let empty = 0;

        initial.forEach((car, index) => {
            if (car !== 0) {
                let targetPosition = target.indexOf(car);

                // Only take action if current car isn't in target space
                if (index !== targetPosition) {
                    let currentTargetOccupant = initial[targetPosition];
                    let emptyPosition = initial.indexOf(0);

                    // make target position empty
                    initial[targetPosition] = empty;
                    // make empty position equal to target occupant
                    initial[emptyPosition] = currentTargetOccupant;
                    // make parking space empty
                    initial[index] = empty;
                    // make target position equal parking space
                    initial[targetPosition] = car;
                }
            }
        });

        // Determine if first pass was sufficient, if not perform shift again
        let successfulMove = this.compareArrays(initial, target);

        if (!successfulMove) {
            this.shiftCars(initial, target);
        }
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