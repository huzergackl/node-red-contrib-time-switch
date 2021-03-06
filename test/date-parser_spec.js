/**
 The MIT License (MIT)

 Copyright (c) 2020 @devRoemer

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

const moment = require('moment');
const should = require('should');
const DateParser = require('../date-parser.js');

// eslint-disable-next-line max-lines-per-function
describe('date-parser', function() {

    // eslint-disable-next-line max-lines-per-function
    describe('timeToMoment', function() {
        let location = null;
        let day = null;
        before(function() {
            location = { lat: 51.33411, lon: -0.83716};
            day = moment.parseZone('2019-11-21 18:10:03+02:00');
        });
        it('should parse before midnight - with utc of current time is previous day', function() {
            const specialCaseDay = moment.parseZone('2019-11-21 01:10:00+02:00');
            const result = DateParser.timeToMoment(specialCaseDay, '23:59:59', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T23:59:00+02:00');
        });
        it('should parse before midnight - with utc of current time is next day', function() {
            const specialCaseDay = moment.parseZone('2019-11-21 23:59:00-02:00');
            const result = DateParser.timeToMoment(specialCaseDay, '23:59:59', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T23:59:00-02:00');
        });
        it('should parse before midnight', function() {
            const result = DateParser.timeToMoment(day, '23:59:59', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T23:59:00+02:00');
        });
        it('should parse midnight', function() {
            const result = DateParser.timeToMoment(day, '00:00:00', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T00:00:00+02:00');
        });
        it('should parse after midnight', function() {
            const result = DateParser.timeToMoment(day, '00:01:01', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T00:01:00+02:00');
        });
        it('should parse after midnight - with utc of current time is previous day', function() {
            const specialCaseDay = moment.parseZone('2019-11-21 01:10:00+02:00');
            const result = DateParser.timeToMoment(specialCaseDay, '00:01:01', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T00:01:00+02:00');
        });
        it('should parse after midnight - with utc of current time is next day', function() {
            const specialCaseDay = moment.parseZone('2019-11-21 23:59:00-02:00');
            const result = DateParser.timeToMoment(specialCaseDay, '00:01:01', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T00:01:00-02:00');
        });
        it('should parse before midday', function() {
            const result = DateParser.timeToMoment(day, '11:59:59', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T11:59:00+02:00');
        });
        it('should parse midday', function() {
            const result = DateParser.timeToMoment(day, '12:00:00', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T12:00:00+02:00');
        });
        it('should parse after midday', function() {
            const result = DateParser.timeToMoment(day, '12:01:01', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T12:01:00+02:00');
        });
        it('should parse two digit time', function() {
            const result = DateParser.timeToMoment(day, '13:10', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T13:10:00+02:00');
        });
        it('should parse two digit time without minutes', function() {
            const result = DateParser.timeToMoment(day, '22:00', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T22:00:00+02:00');
        });
        it('should parse sunrise', function() {
            const result = DateParser.timeToMoment(day, 'sunrise', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T09:31:00+02:00');
        });
        it('should parse sunrise - with utc of current time is previous day', function() {
            const specialCaseDay = moment.parseZone('2019-11-21 01:10:00+02:00');
            const result = DateParser.timeToMoment(specialCaseDay, 'sunrise', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T09:31:00+02:00');
        });
        it('should parse sunrise - with utc of current time is next day', function() {
            const specialCaseDay = moment.parseZone('2019-11-21 23:10:00-02:00');
            const result = DateParser.timeToMoment(specialCaseDay, 'sunrise', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T05:31:00-02:00');
        });
        it('should parse sunriseEnd', function() {
            const result = DateParser.timeToMoment(day, 'sunriseEnd', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T09:35:00+02:00');
        });
        it('should parse goldenHourEnd', function() {
            const result = DateParser.timeToMoment(day, 'goldenHourEnd', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T10:26:00+02:00');
        });
        it('should parse solarNoon', function() {
            const result = DateParser.timeToMoment(day, 'solarNoon', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T13:50:00+02:00');
        });
        it('should parse goldenHour', function() {
            const result = DateParser.timeToMoment(day, 'goldenHour', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T17:14:00+02:00');
        });
        it('should parse sunsetStart', function() {
            const result = DateParser.timeToMoment(day, 'sunsetStart', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T18:05:00+02:00');
        });
        it('should parse sunset', function() {
            const result = DateParser.timeToMoment(day, 'sunset', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T18:09:00+02:00');
        });
        it('should parse dusk', function() {
            const result = DateParser.timeToMoment(day, 'dusk', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T18:47:00+02:00');
        });
        it('should parse nauticalDusk', function() {
            const result = DateParser.timeToMoment(day, 'nauticalDusk', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T19:28:00+02:00');
        });
        it('should parse night', function() {
            const result = DateParser.timeToMoment(day, 'night', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T20:07:00+02:00');
        });
        it('should parse nadir', function() {
            const result = DateParser.timeToMoment(day, 'nadir', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T01:50:00+02:00');
        });
        it('should parse nightEnd', function() {
            const result = DateParser.timeToMoment(day, 'nightEnd', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T07:33:00+02:00');
        });
        it('should parse nauticalDawn', function() {
            const result = DateParser.timeToMoment(day, 'nauticalDawn', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T08:12:00+02:00');
        });
        it('should parse dawn', function() {
            const result = DateParser.timeToMoment(day, 'dawn', location);
            result.format('YYYY-MM-DDTHH:mm:ssZ').should.equal('2019-11-21T08:53:00+02:00');
        });

        it('should parse invalid name', function() {
            const result = DateParser.timeToMoment(day, 'invalidName', location);
            should.not.exist(result);
        });
        it('should parse empty date', function() {
            const result = DateParser.timeToMoment(day, '', location);
            should.not.exist(result);
        });
        it('should parse undefined date', function() {
            const result = DateParser.timeToMoment(day, undefined, location);
            should.not.exist(result);
        });
        it('should parse null date', function() {
            const result = DateParser.timeToMoment(day, null, location);
            should.not.exist(result);
        });
    });
});

