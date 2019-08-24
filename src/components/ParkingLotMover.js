import React, { Component } from 'react';

import '../styles/ParkingLotMover.scss';

export default class ParkingLotMover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movementStatements: []
        };

        this.compareArrays = this.compareArrays.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.shiftCars = this.shiftCars.bind(this);
    }

    compareArrays(array1, array2) {
        let arraysEqual = true;

        array1.forEach((value, index) => {   
            arraysEqual = array2[index] !== value ? false : arraysEqual;
        });

        return arraysEqual;
    }

    reportVehicleMovement(car, currentSpace, newSpace) {
        let statements = this.state.movementStatements,
            newline = this.state.movementStatements.length >= 1 ? '\n' : '';
            statements.push(`${newline}Moved ${car} from space ${currentSpace} to space ${newSpace}`);

        this.setState({ movementStatements: statements });
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
                    // make current parking space empty
                    initial[index] = empty;
                    // make target position equal car's value
                    initial[targetPosition] = car;

                    // Print car movements
                    this.reportVehicleMovement(currentTargetOccupant, targetPosition, emptyPosition);
                    this.reportVehicleMovement(car, index, targetPosition);
                }
            }
        });

        // Determine if first pass was sufficient, if not perform shift again
        let successfulMove = this.compareArrays(initial, target);

        if (!successfulMove) {
            this.shiftCars(initial, target);
        }
    }

    onSubmit(event) {
        // prevents page reload
        event.preventDefault();
        // clear old states on new request
        this.setState({ movementStatements: [] });

        // If user has supplied values for each array, process turning strings to numbers
        if (this.refs.initialArray.value && this.refs.initialArray.value) {
            let initialArray = this.refs.initialArray.value.split(',').map((string) => +string),
                targetArray = this.refs.targetArray.value.split(',').map((string) => +string),
                arraysEqual = this.compareArrays(initialArray, targetArray);

            if (initialArray.length === targetArray.length) {
                // check to see if initial and target are ordered the same
                if (arraysEqual === false) {
                    this.shiftCars(initialArray, targetArray);
                } else {
                    this.setState({ movementStatements: 'Lots are already the same' });
                }
            } else {
                this.setState({movementStatements: 'Arrays are not of the same length' });
            }
        } else {
            this.setState({movementStatements: 'No arrays provided'});
        }
    }

    render() {
        return(
            <div className="parking-section">
                <div className="description">
                    Provide initial and final states of the parking lot to start movement.
                    Enter comma separated integers into each input.
                </div>
                <form className="parking-form" onSubmit={this.onSubmit}>
                    <label className="initial-label">
                        Initial Parking Lot Array:
                        <input type="text" 
                            defaultValue="0,1,2,3" 
                            className="array-input"
                            ref='initialArray'/>
                    </label>
                    <label className="target-label">
                        Target Parking Lot Array:
                        <input type="text" 
                            name="target"
                            defaultValue="0,3,1,2"
                            className="array-input"
                            ref='targetArray'/>                   
                    </label>
                    <input className="submit-button" type="submit" value="Submit"/>
                </form>
                <div className="statement-section">
                    <textarea 
                        className="statement-box"
                        readOnly={true}
                        value={this.state.movementStatements}
                    />
                </div>
            </div>
        );
    }
}
