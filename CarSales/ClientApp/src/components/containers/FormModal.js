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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var reactstrap_1 = require("reactstrap");
var FormModal = /** @class */ (function (_super) {
    __extends(FormModal, _super);
    function FormModal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormModal.prototype.render = function () {
        return (React.createElement(reactstrap_1.Modal, { isOpen: this.props.isOpen, toggle: this.props.toggle },
            React.createElement(reactstrap_1.ModalHeader, { toggle: this.props.toggle }, " Confirmation "),
            React.createElement(reactstrap_1.ModalBody, null, "Car Added Successfully. Please click OK to go to Cars Page."),
            React.createElement(reactstrap_1.ModalFooter, null,
                React.createElement(reactstrap_1.Button, { color: "secondary", onClick: this.props.toggle }, "OK"))));
    };
    return FormModal;
}(React.Component));
exports.default = react_redux_1.connect()(FormModal);
//# sourceMappingURL=FormModal.js.map