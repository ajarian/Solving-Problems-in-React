import React, { Component } from 'react';

import moment from 'moment';
import vis from 'vis-timeline/dist/vis-timeline-graph2d.esm';
import 'vis-timeline/dist/vis-timeline-graph2d.css';

export default class SalesGraphWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSet: null,
            options: null,
            timeline: null
        }

        this.createDataSet = this.createDataSet.bind(this);
    }

    componentDidMount() {
        this.createDataSet();
    }

    createDataSet() {
        let dataPoints = 10,
            graphPoints = [];

        for (let i=0; i < dataPoints; i++) {
            let point = {x: moment(), y: i};
            graphPoints.push(point);
        }

        let dataSet = new vis.DataSet(graphPoints),
            options = {
            };

        let container = document.getElementById('graph');
        let graph2d = new vis.Graph2d(container, dataSet, options);
        console.log(graph2d);

        this.setState({
            dataSet: dataSet,
            options: options,
            graph: graph2d
        });
    }

    render() {
        return (
            <div>
                <div>Most Popular Times</div>
                <div>
                    Gain insight on which time of the day your product is most popular.
                </div>
                <div id="graph">

                </div>
                <div>
                    This product is used most often between x - y.
                </div>
                <button onClick={() => this.state.graph.redraw()}>Press</button>
            </div>
        );
    }
}