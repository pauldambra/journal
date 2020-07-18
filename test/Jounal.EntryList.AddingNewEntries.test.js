"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const globals_1 = require("@jest/globals");
const React = require("react");
const journal_1 = require("../src/journal");
globals_1.describe('the journal entries are listed', function () {
    globals_1.it('shows an empty list when there are none', () => {
        const { container } = react_1.render(React.createElement(journal_1.Journal, { listings: [] }));
        const listing = container.querySelector('.listing');
        const listingEntries = listing.querySelectorAll('.entry');
        globals_1.expect(listingEntries).toHaveLength(0);
    });
    globals_1.it('shows a single entry under its date', () => {
        const entry = {
            date: '2020-07-11T22:10:06Z', text: 'tomat'
        };
        const { container } = react_1.render(React.createElement(journal_1.Journal, { listings: [entry] }));
        const listing = container.querySelector('.listing [data-date="2020-07-11"]');
        const listingEntries = listing.querySelectorAll('.entry');
        globals_1.expect(listingEntries).toHaveLength(1);
        globals_1.expect(listingEntries[0].textContent).toEqual('tomat');
    });
    globals_1.it('shows a several entries from one day under the same date', () => {
        const entries = [{
                date: '2020-07-17T22:10:06Z',
                text: 'one'
            }, {
                date: '2020-07-17T23:10:06Z',
                text: 'two'
            }];
        const { container } = react_1.render(React.createElement(journal_1.Journal, { listings: entries }));
        const listing = container.querySelector('.listing [data-date="2020-07-17"]');
        const listingEntries = listing.querySelectorAll('.entry');
        globals_1.expect(listingEntries).toHaveLength(2);
        globals_1.expect(listingEntries[0].textContent).toEqual('one');
        globals_1.expect(listingEntries[1].textContent).toEqual('two');
    });
    globals_1.it('shows a several entries under their different dates', () => {
        const entries = [{
                date: '2020-07-18T22:10:06Z',
                text: 'one'
            }, {
                date: '2020-07-17T23:10:06Z',
                text: 'two'
            }];
        const { container } = react_1.render(React.createElement(journal_1.Journal, { listings: entries }));
        const first = container.querySelector('.listing [data-date="2020-07-17"]');
        const firstListingEntry = first.querySelectorAll('.entry');
        globals_1.expect(firstListingEntry).toHaveLength(1);
        globals_1.expect(firstListingEntry[0].textContent).toEqual('two');
        const second = container.querySelector('.listing [data-date="2020-07-18"]');
        const secondListingEntry = second.querySelectorAll('.entry');
        globals_1.expect(secondListingEntry).toHaveLength(1);
        globals_1.expect(secondListingEntry[0].textContent).toEqual('one');
    });
});
//# sourceMappingURL=Jounal.EntryList.AddingNewEntries.test.js.map