import { DateString, MustBeAValidDateString } from '../src/dateString'

describe('datestrings are strings...', function () {
  it("but cannot have the empty string", () => {
    expect(() => new DateString(""))
      .toThrowError(MustBeAValidDateString)
  })

  it("but cannot have a null string", () => {
    expect(() => new DateString(null))
      .toThrowError(MustBeAValidDateString)
  })

  it("cannot have an arbitrary string", () => {
    expect(() => new DateString("an arbitrary string"))
      .toThrowError(MustBeAValidDateString)
  })

  it("can have a date string", () => {
    expect(() => new DateString("2020-07-17T23:10:06Z"))
      .not
      .toThrowError(MustBeAValidDateString)
  })

  it("can be used as a string", () => {
    const original = "2020-07-17T23:10:06Z"
    const ds = new DateString(original)
    expect(ds.asString()).toEqual(original)
  })

  it("can remove time", () => {
    const original = "2020-07-17T23:10:06Z"
    const ds = new DateString(original)
    expect(ds.withoutTime()).toEqual("2020-07-17")
  })
})
