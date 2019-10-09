import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as HomeStore from '../store/Home';
import '../css/NavMenu.css';


type HomeProps =
    HomeStore.HomeState // ... state we've requested from the Redux store
    & typeof HomeStore.actionCreators // ... plus action creators we've requested

// Component state.
interface IState {
    isOpen: boolean;
    dropdownOpen: boolean;
}

class NavMenu extends React.PureComponent<HomeProps, IState> {
    //Setting default values.
    public state = {
        isOpen: false,
        dropdownOpen: false,
    };

    public componentDidMount() {
        //Calling all types for Menu options.
        this.props.requestAllVehicleTypes();
    }

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">CarSales</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">

                                <NavItem>
                                    <Dropdown nav inNavbar isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                                        <DropdownToggle className="text-info" nav caret>
                                            Add Vehicle
                                        </DropdownToggle>
                                        {/*Mapping over vehicle types available. Dis-abling options that don't have models available.*/}
                                        <DropdownMenu>
                                            {this.props.vehicleTypes.map((type) => 
                                                type.modelCount > 0 ?
                                                    <DropdownItem tag={Link}
                                                        to={{ pathname: '/addVehicle', state: { id: type.vehicleTypeId } }}
                                                        key={type.vehicleTypeId}>{type.vehicleTypeName}
                                                    </DropdownItem>
                                                    :
                                                    <DropdownItem disabled key={type.vehicleTypeId}>{type.vehicleTypeName}</DropdownItem>
                                           
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                               
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/cars">Cars</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    //Toggle for Navbar.
    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    //Toggle for dropdown.
    private toggleDropDown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }


}
//Connecting State and actions to the component.
export default connect(
    (state: ApplicationState) => state.vehicleData, // Selects which state properties are merged into the component's props
    HomeStore.actionCreators // Selects which action creators are merged into the component's props
)(NavMenu as any);
