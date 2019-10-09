"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var react_router_dom_1 = require("react-router-dom");
var VehicleFormStore = require("../store/VehicleForm");
var reactstrap_1 = require("reactstrap");
var Constants_1 = require("../store/Constants");
require("../css/NavMenu.css");
var FormModal_1 = require("./containers/FormModal");
var errors = [];
var VehicleForm = /** @class */ (function (_super) {
    __extends(VehicleForm, _super);
    function VehicleForm(props) {
        var _this = _super.call(this, props) || this;
        //Redirect to Cars page on successful submission.
        _this.toggle = function () {
            var path = "/cars";
            _this.props.history.push(path);
        };
        //Update state and fetch an action to get model.
        _this.handleMakeSelected = function (e) {
            console.log(e.target.value);
            _this.setState({
                MakeId: parseInt(e.target.value)
            });
            _this.props.requestModels(parseInt(e.target.value));
        };
        //Update state and fetch an action to get bodyTypes.
        _this.handleModelSelected = function (e) {
            console.log(e.target.value);
            _this.setState({
                Car: __assign(__assign({}, _this.state.Car), { ModelID: parseInt(e.target.value) })
            });
            _this.props.requestBodyTypes();
        };
        ////Update state with car values.
        _this.handleBodyTypeSelected = function (e) {
            console.log(e.target.value);
            _this.setState({
                Car: __assign(__assign({}, _this.state.Car), { BodyTypeID: parseInt(e.target.value) })
            });
        };
        // Update state with number of doors.
        _this.handleDoorsSelected = function (e) {
            console.log(e.target.value);
            _this.setState({
                Car: __assign(__assign({}, _this.state.Car), { Doors: parseInt(e.target.value) })
            });
        };
        //Form Submission.
        _this.handleSubmit = function (e) {
            console.log("Came for submit");
            e.preventDefault();
            if (_this.validateForm()) {
                _this.props.submitCar(_this.state.Car);
                _this.setState({ submitSuccess: true, submitErrors: errors });
            }
            else {
                _this.setState({ submitErrors: errors });
            }
        };
        //Initializing state.
        _this.state = {
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
        return _this;
    }
    // This method is called when the component is first added to the document
    VehicleForm.prototype.componentDidMount = function () {
        console.log("componentdidMount");
        if (this.props.location.state !== undefined) {
            //Requesting makes in accordance to option selected.
            this.props.requestMakes(this.props.location.state.id);
        }
    };
    VehicleForm.prototype.render = function () {
        //Redirect if user hasn't selected a vehicle Type else render.
        if (this.props.location.state === undefined)
            return (React.createElement(react_router_1.Redirect, { to: "/" }));
        else
            return (React.createElement(React.Fragment, null,
                React.createElement("h1", { id: "tabelLabel" }, "Add Vehicle"),
                React.createElement("p", null, "This component demonstrates fetching data from the server and working with URL parameters."),
                this.renderSharedeForm()));
    };
    //Shared inputs of all vehicle types.
    VehicleForm.prototype.renderSharedeForm = function () {
        return (
        //Shared Form Inputs for all Vehicle types.
        React.createElement(reactstrap_1.Form, { onSubmit: this.handleSubmit, className: "form" },
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { md: 6 },
                    React.createElement(reactstrap_1.FormGroup, null,
                        React.createElement(reactstrap_1.Label, { for: "makeSelect" }, "Select make"),
                        React.createElement(reactstrap_1.Input, { onChange: this.handleMakeSelected, type: "select", name: "select", id: "makeSelect" },
                            React.createElement("option", { hidden: true, disabled: true, selected: true }, " -- Make -- "),
                            this.props.Makes.map(function (type) {
                                return React.createElement("option", { value: type.makeId, key: type.makeId }, type.makeName);
                            })))),
                React.createElement(reactstrap_1.Col, { md: 6 },
                    React.createElement(reactstrap_1.FormGroup, null,
                        React.createElement(reactstrap_1.Label, { for: "modelSelect" }, "Select Model"),
                        React.createElement(reactstrap_1.Input, { onChange: this.handleModelSelected, type: "select", name: "select", id: "modelSelect" },
                            React.createElement("option", { hidden: true, disabled: true, selected: true }, " -- Model -- "),
                            this.props.Models.length > 0 &&
                                this.props.Models.map(function (type) {
                                    return React.createElement("option", { value: type.modelId, key: type.modelId }, type.modelName);
                                }))))),
            this.props.location.state.id == Constants_1.TYPE_CAR &&
                React.createElement(reactstrap_1.Row, null,
                    React.createElement(reactstrap_1.Col, { md: 6 },
                        React.createElement(reactstrap_1.FormGroup, null,
                            React.createElement(reactstrap_1.Label, { for: "bodyTypeSelect" }, "Select Model"),
                            React.createElement(reactstrap_1.Input, { onChange: this.handleBodyTypeSelected, type: "select", name: "select", id: "bodyTypeSelect" },
                                React.createElement("option", { hidden: true, disabled: true, selected: true }, " -- BodyType -- "),
                                this.props.BodyTypes.length > 0 &&
                                    this.props.BodyTypes.map(function (type) {
                                        return React.createElement("option", { value: type.bodyTypeId, key: type.bodyTypeId }, type.bodyTypeName);
                                    })))),
                    React.createElement(reactstrap_1.Col, { md: 6 },
                        React.createElement(reactstrap_1.FormGroup, null,
                            React.createElement(reactstrap_1.Label, { for: "Doors" }, "Select Doors"),
                            React.createElement(reactstrap_1.InputGroup, null, this.state.Car.BodyTypeID !== undefined ?
                                React.createElement(reactstrap_1.Input, { onChange: this.handleDoorsSelected, placeholder: "Doors", min: 2, max: 5, type: "number", step: "1" })
                                :
                                    React.createElement(reactstrap_1.Input, { disabled: true, placeholder: "Doors", min: 2, max: 5, type: "number", step: "1" }))))),
            React.createElement("div", { className: "text-right" },
                React.createElement(reactstrap_1.Button, { style: { display: "inline-block", margin: "20px" }, color: "primary", size: "lg" }, "SUBMIT")),
            // List of errors
            this.state.submitErrors.map(function (err) {
                return React.createElement(reactstrap_1.Alert, { color: "info" }, err);
            }),
            // Success message display.
            this.props.success == true &&
                React.createElement(reactstrap_1.Alert, { color: "success" }, "\"Car Added Successfully.\""),
            //Open modal if car added successfully.
            (this.props.success && this.state.submitSuccess) &&
                React.createElement(FormModal_1.default, { isOpen: this.state.submitSuccess, toggle: this.toggle })));
    };
    //Form Validation.
    VehicleForm.prototype.validateForm = function () {
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
    };
    return VehicleForm;
}(React.PureComponent));
//Router connection.
var ShowTheLocationWithRouter = react_router_dom_1.withRouter(VehicleForm);
exports.default = react_redux_1.connect(function (state) { return state.FormData; }, // Selects which state properties are merged into the component's props
VehicleFormStore.actionCreators // Selects which action creators are merged into the component's props
)(VehicleForm);
//# sourceMappingURL=VehicleForm.js.map