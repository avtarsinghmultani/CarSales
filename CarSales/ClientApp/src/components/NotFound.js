"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
require("../css/NotFound.css");
var NotFound = function () { return (React.createElement("div", { id: "notfound" },
    React.createElement("div", { className: "notfound" },
        React.createElement("div", { className: "notfound-404" },
            React.createElement("h3", null, "Oops! Page not found"),
            React.createElement("h1", null,
                React.createElement("span", null, "4"),
                React.createElement("span", null, "0"),
                React.createElement("span", null, "4"))),
        React.createElement("h2", null, "we are sorry, but the page you requested was not found")))); };
exports.default = react_redux_1.connect()(NotFound);
//# sourceMappingURL=NotFound.js.map