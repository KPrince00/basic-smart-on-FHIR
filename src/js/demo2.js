(function(window){
    console.log("hi!");
    window.extractData = function() {
        console.log("howdy!");
        FHIR.oauth2.ready().then(onReady);
        var ret = $.Deferred();

        function onError() {
            console.log('Loading error', arguments);
            ret.reject();
        }

        function onReady(smart)  {
            console.log("Smart ready!");
            console.log(smart);
            smart.patient.request('Encounter', {
                resolveReferences: [ "serviceProvider", "participant.0.individual" ]
            }).then(function(results) {
                ret.resolve(results);
            });
        }

        FHIR.oauth2.ready(onReady, onError);
        return ret.promise();
    };

    window.drawVisualization = function(encounters) {
        console.log(encounters)
        $('#holder').show();
        $('#loading').hide();
        //Turn encounters into a list of elements
        const mainUL = document.createElement('ol');
        let encounterList = encounters.entry;
        for (const encounter of encounterList) {
            mainUL.appendChild(encounterToLi(encounter.resource))
        }
        //Display list
        $('#maindetails').html(mainUL);
    };

    function encounterToLi(encounter) {
        const encounterLI = document.createElement('li');
        encounterLI.innerHTML = encounter.type[0].coding[0].display;

        const detailsUl = document.createElement('ul');
        //Append details
        periodLI = document.createElement('li');
        periodLI.innerHTML = "Date: " + encounter.period.start.substring(0,10);
        detailsUl.appendChild(periodLI);

        practitionerLI = document.createElement('li');
        let practitionerName = encounter.participant[0].individual.name[0];
        practitionerLI.innerHTML = "Practitioner: " + practitionerName.given[0] + " " + practitionerName.family;
        detailsUl.appendChild(practitionerLI);

        providerLI = document.createElement('li');
        providerLI.innerHTML = "Provider: " + encounter.serviceProvider.name
        detailsUl.appendChild(providerLI);

        statusLI = document.createElement('li');
        statusLI.innerHTML = "Status: " + encounter.status;
        detailsUl.appendChild(statusLI);

        encounterLI.appendChild(detailsUl);
        return encounterLI;
    }

})(window);
