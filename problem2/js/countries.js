/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
var requests = ['/countries', '/cities', '/populations'];
var responses = {};
var toponym = prompt('Enter a location (city or country)');

for (i = 0; i < 3; i++) {
    var request = requests[i];
    var callback = function (request) {
        return function (error, result) {
            responses[request] = result;
            var l = [];
            for (K in responses)
                l.push(K);

            if (l.length == 3) {
                var c = [], cc = [], p = 0;
                var citiesInCountry = [],
                    populationInToponym = 0;
                for (i = 0; i < responses['/countries'].length; i++) {
                    if (responses['/countries'][i].continent === 'Africa') {
                        c.push(responses['/countries'][i].name);
                    }
                }

                for (i = 0; i < responses['/cities'].length; i++) {
                    for (j = 0; j < c.length; j++) {
                        if (responses['/cities'][i].country === c[j]) {
                            cc.push(responses['/cities'][i].name);
                        }
                    }
                    if (toponym && responses['/cities'][i].country === toponym) {
                        citiesInCountry.push(responses['/cities'][i].name);
                    }
                }

                if (toponym && citiesInCountry.length === 0) {
                    // looks like user entered city name because we do not know such country
                    citiesInCountry.push(toponym);
                }

                for (i = 0; i < responses['/populations'].length; i++) {
                    for (j = 0; j < cc.length; j++) {
                        if (responses['/populations'][i].name === cc[j]) {
                            p += responses['/populations'][i].count;
                        }
                    }
                    for (j = 0; toponym && j < citiesInCountry.length; j++) {
                        if (responses['/populations'][i].name === citiesInCountry[j]) {
                            populationInToponym += responses['/populations'][i].count;
                        }
                    }
                }

                console.log('Total population in African cities: ' + p);
                console.log(toponym && populationInToponym > 0 ?
                    "The population of " + toponym + " is " + populationInToponym :
                    "Next time ask something we know!");
            }
        }
    } (request);

    getData(request, callback);
}
