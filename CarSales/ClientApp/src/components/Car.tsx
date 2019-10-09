import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as CarStore from '../store/Cars';


// At runtime, Redux will merge together...
type CarProps =
    CarStore.CarsState // ... state we've requested from the Redux store
    & typeof CarStore.actionCreators;


class Car extends React.PureComponent<CarProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.props.requestAllCars();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Cars List</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderCarsTable()}
            </React.Fragment>
        );
    }


    private renderCarsTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Doors</th>
                        <th>Body Type</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping over all the cars available. */}
                    {this.props.cars.map((car) =>
                        <tr key={car.id}>
                            <td>{car.make}</td>
                            <td>{car.model}</td>
                            <td>{car.doors}</td>
                            <td>{car.bodyType}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.cars, // Selects which state properties are merged into the component's props
    CarStore.actionCreators // Selects which action creators are merged into the component's props
)(Car as any);

