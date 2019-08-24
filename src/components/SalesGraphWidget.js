import React, { Component } from 'react';
import moment from 'moment';
import vis from 'vis-timeline/dist/vis-timeline-graph2d.esm';
import 'vis-timeline/dist/vis-timeline-graph2d.css';

import '../styles/SalesGraphWidget.scss';

export default class SalesGraphWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSet: null,
            options: null,
            timeline: null
        }

        this.createGraph = this.createGraph.bind(this);
        this.findMaxRange = this.findMaxRange.bind(this);
    }

    componentDidMount() {
        this.createGraph();
    }

    componentWillUnmount() {
        this.state.graph.destroy();
    }

    createGraph() {
        let numberOfPoints = 10,
            graphPoints = [];

        // Creating set of points to display on graph
        // Each point has a random y value and an x value that is 
        // i hours from current time
        for (let i=1; i <= numberOfPoints; i++) {
            let time = moment().startOf('hour').add(i, 'hours'),
                saleNumber = (Math.random() * 100) + i ,
                point = {x: time, y: saleNumber};
            
            graphPoints.push(point);
        }

        // Setting necessary values to instantiate graph
        let container = document.getElementById('graph'),
            dataSet = new vis.DataSet(graphPoints),
            options = {
                width: '800px',
                height: '350px',
                drawPoints: {
                    size: 8,
                    style: 'circle'
                },
                format: {
                    minorLabels: {
                        hour: 'ha'
                    },
                    majorLabels: {
                        hour: 'ha'
                    }
                },
                start: graphPoints[0].x,
                end: graphPoints[graphPoints.length - 1].x,
                showMajorLabels: false
            };

        let graph2d = new vis.Graph2d(container, dataSet, options);

        this.setState({
            dataSet: dataSet,
            options: options,
            graph: graph2d
        });

        this.findMaxRange(dataSet);
    }

    findMaxRange(dataSet) {
        let max = 0,
            maxTime = null;

        dataSet.forEach((point) => {
            if (point.y > max) {
                max = point.y;
                maxTime = point.x;
            }
        });

        this.setState({ maxTime });
    }

    render() {
        let maxRange = '';

        if (this.state.maxTime) {
            maxRange = `${this.state.maxTime.format('h:mma')} - ${this.state.maxTime.add(1, 'hour').format('h:mma')}`
        }

        return (
            <div className="sales-graph">
                <div className="title">Most Popular Times</div>
                <div className="description">
                    Gain insight on which time of the day your product is most popular.
                </div>
                <div id="graph"/>
                { this.state.dataSet &&
                <div className="tooltip-section">
                    This product is used most often between { maxRange }.
                </div>
                }
            </div>
        );
    }
}