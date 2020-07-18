"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Journal = void 0;
const React = require("react");
const entryList_1 = require("./entryList");
exports.Journal = (props) => {
    return (React.createElement("div", null,
        React.createElement(entryList_1.EntryList, { listings: props.listings })));
};
//# sourceMappingURL=journal.js.map