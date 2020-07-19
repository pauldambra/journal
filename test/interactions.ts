import {fireEvent} from "@testing-library/dom";

export const selectAnEntry = (container: HTMLElement, dateSelector: string) => {
    const day = container.querySelector('.listing [data-date="' + dateSelector + '"]')
    const entry = day.querySelector('.entry');
    fireEvent.click(entry)
    return entry;
}
