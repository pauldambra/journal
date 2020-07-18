"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const journal_1 = require("./journal");
react_dom_1.hydrate(React.createElement(journal_1.Journal, { listings: [] }), document.getElementById('root'));
//# sourceMappingURL=index.js.map