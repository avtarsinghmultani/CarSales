import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router';
import { withRouter } from "react-router-dom"
import { ApplicationState } from '../store';
import * as VehicleFormStore from '../store/VehicleForm';
import { Form, FormGroup, Label, Input, Row, Col, Button, Alert, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { TYPE_CAR, TYPE_BIKE, TYPE_BOAT, Car } from '../store/Constants';
import '../css/NavMenu.css';
import FormModal from './containers/FormModal';


//Parameters to use from previous Component.
type PathParamsType = {
    location: string | undefined,
    history: string | undefined,
}

// At runtime, Redux will merge together...
type VehicleFormProps =
    VehicleFormStore.VehicleFormState // ... state we've requested from the Redux store
    & typeof VehicleFormStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<PathParamsType> // plus Redirected Component props

//Component State
interface IState {
    Car: Car;
    MakeId?: number;
    submitSuccess: boolean;
    submitErrors: string[];
    redirect: boolean;
}
let errors: string[] = [];

class VehicleForm extends React.PureComponent<VehicleFormProps, IState> {

    state: IState;
    
    constructor(props: VehicleFormProps) {
        super(props);
        //Initializing state.
        this.state = {
            Car: {
                BodyTypeID: undefined,
                ModelID: undefined,
                Doors: undefined,
                Created: undefined,
            },
            MakeId: undefined,
            submitSuccess: false,
            submitErrors: [],
            redirect: false,
        };
    }

    // This method is called when the component is first added to the document
    public componentDidMount() {
        console.log("componentdidMount")
        if (this.props.location.state !== undefined) {
            //Requesting makes in accordance to option selected.
            this.props.requestMakes(this.props.location.state.id);
        }
    }
    
   

    public render() {
        //Redirect if user hasn't selected a vehicle Type else render.
        if (this.props.location.state === undefined)
            return (
                <Redirect to="/"></Redirect>
            )
        else
            return (
            <React.Fragment>
                <h1 id="tabelLabel">Add Vehicle</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderSharedeForm()}
            </React.Fragment>
        );
    }

    //Shared inputs of all vehicle types.
    private renderSharedeForm() {
        
        return (
            //Shared Form Inputs for all Vehicle types.
            <Form onSubmit={this.handleSubmit} className="form">
                <Row>
                    <Col md={6}>
                    <FormGroup>
                            <Label for="makeSelect">Select make</Label>
                            <Input onChange={this.handleMakeSelected} type="select" name="select" id="makeSelect">
                                <option hidden disabled selected> -- Make -- </option>
                                {this.props.Makes.map((type) =>
                                    <option value={type.makeId} key={type.makeId}>{type.makeName}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="modelSelect">Select Model</Label>
                            <Input onChange={this.handleModelSelected} type="select" name="select" id="modelSelect">
                                <option hidden disabled selected> -- Model -- </option>
                                {this.props.Models.length > 0 &&
                                    this.props.Models.map((type) =>
                                        <option value={type.modelId} key={type.modelId}>{type.modelName}</option>
                                    ) 
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                {/* Input depending upon type of vehicle.*/}
                {this.props.location.state.id == TYPE_CAR &&
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="bodyTypeSelect">Select Model</Label>
                                <Input onChange={this.handleBodyTypeSelected} type="select" name="select" id="bodyTypeSelect">
                                    <option hidden disabled selected> -- BodyType -- </option>
                                    {
                                        this.props.BodyTypes.length > 0 &&
                                        this.props.BodyTypes.map((type) =>
                                            <option value={type.bodyTypeId} key={type.bodyTypeId}>{type.bodyTypeName}</option>
                                        )
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                            <Label for="Doors">Select Doors</Label>
                            <InputGroup>
                                    { 
                                        this.state.Car.BodyTypeID !== undefined ?
                                        <Input onChange={this.handleDoorsSelected} placeholder="Doors" min={2} max={5} type="number" step="1" />
                                            :
                                            <Input disabled placeholder="Doors" min={2} max={5} type="number" step="1" />
                                    }
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                }
                
                    <div className="text-right">
                        <Button style={{ display: "inline-block", margin: "20px" }} color="primary" size="lg" >SUBMIT</Button>
                    </div>
                {
                    // List of errors
                    this.state.submitErrors.map((err) =>
                        <Alert color="info">
                            {err}
                        </Alert>)
                }
                {
                    // Success message display.
                    this.props.success == true &&
                        <Alert color="success">
                            "Car Added Successfully."
                        </Alert>
                }
                {
                    //Open modal if car added successfully.
                    (this.props.success && this.state.submitSuccess) &&
                    <FormModal isOpen={this.state.submitSuccess} toggle={this.toggle}/>
                }
            </Form>

        );
    }

    //Redirect to Cars page on successful submission.
    toggle = () => {
        let path = `/cars`;
        this.props.history.push(path);
    }

    //Update state and fetch an action to get model.
    handleMakeSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        this.setState({
                MakeId: parseInt(e.target.value)
        });
        this.props.requestModels(parseInt(e.target.value));
    }

    //Update state and fetch an action to get bodyTypes.
    handleModelSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        this.setState({
            Car: {
                ...this.state.Car,
                ModelID: parseInt(e.target.value)
            }
        });
        this.props.requestBodyTypes();
    }

    ////Update state with car values.
    handleBodyTypeSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        this.setState({
            Car: {
                ...this.state.Car,
                BodyTypeID: parseInt(e.target.value)
            }
        });
    }

    // Update state with number of doors.
    handleDoorsSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        this.setState({
            Car: {
                ...this.state.Car,
                Doors: parseInt(e.target.value)
            }
        });
    }

    //Form Validation.
    private validateForm(): boolean {
        errors = [];
        if (this.state.MakeId === undefined) {
            errors.push("please choose a make.");
        }
        if (this.state.Car.ModelID === undefined) {
            errors.push("please choose a model.");
        }
        if (this.state.Car.BodyTypeID === undefined) {
            errors.push("please choose a body type.");
        }
        if (this.state.Car.Doors === undefined) {
            errors.push("please choose number of doors.");
        }
        if (errors.length == 0) {
            return true;
        }
        return false;
    }

    //Form Submission.
    private handleSubmit =  (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        console.log("Came for submit");
        e.preventDefault();

        if (this.validateForm()) {
            this.props.submitCar(this.state.Car);
            this.setState({ submitSuccess: true, submitErrors: errors });
        }
        else {
            this.setState({ submitErrors: errors });
        }
    };
}

//Router connection.
const ShowTheLocationWithRouter = withRouter(VehicleForm);

export default connect(
    (state: ApplicationState) => state.FormData, // Selects which state properties are merged into the component's props
    VehicleFormStore.actionCreators // Selects which action creators are merged into the component's props
)(VehicleForm as any);