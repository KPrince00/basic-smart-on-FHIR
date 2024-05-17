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
            smart.patient.request('ExplanationOfBenefit', {
                resolveReferences: [ "insurer", "provider" ]
            }).then(function(results) {
                ret.resolve(results);
            });
        }

        FHIR.oauth2.ready(onReady, onError);
        return ret.promise();
    };

    window.drawVisualization = function(results) {
        console.log(results)
        $('#holder').show();
        $('#loading').hide();
        //Turn encounters into a list of elements
        const mainUL = document.createElement('ol');
        let resultsList = results.entry;
        for (const result of resultsList) {
            mainUL.appendChild(eobToLi(result.resource))
        }
        //Display list
        $('#maindetails').html(mainUL);
    };

    function eobToLi(eob) {
        const eobLI = document.createElement('li');
        eobLI.innerHTML = "EOB Type: " + eob.type.coding[0].code;

        const detailsUl = document.createElement('ul');
        //Append details
        periodLI = document.createElement('li');
        periodLI.innerHTML = "Date: " + eob.created
        detailsUl.appendChild(periodLI);

        if(eob.provider) {
            practitionerLI = document.createElement('li');
            let practitionerName = eob.provider.name[0];
            practitionerLI.innerHTML = "Practitioner: " + practitionerName.given[0] + " " + practitionerName.family;
            detailsUl.appendChild(practitionerLI);
        }

        if(eob.insurer) {
            providerLI = document.createElement('li');
            providerLI.innerHTML = "Insurer: " + eob.insurer.name
            detailsUl.appendChild(providerLI);
        }

        statusLI = document.createElement('li');
        statusLI.innerHTML = "Status: " + eob.outcome;
        detailsUl.appendChild(statusLI);

        dispoLI = document.createElement('li');
        dispoLI.innerHTML = "Result: " + eob.disposition;
        detailsUl.appendChild(dispoLI);

        eobLI.appendChild(detailsUl);
        return eobLI;
    }

    function encounterToLi(encounter) {
        const encounterLI = document.createElement('li');
        encounterLI.innerHTML = encounter.type[0].coding[0].display;

        const detailsUl = document.createElement('ul');
        //Append details
        periodLI = document.createElement('li');
        periodLI.innerHTML = "Date: " + encounter.period.start.substring(0,10);
        detailsUl.appendChild(periodLI);

        if(encounter.participant) {
            practitionerLI = document.createElement('li');
            let practitionerName = encounter.participant[0].individual.name[0];
            practitionerLI.innerHTML = "Practitioner: " + practitionerName.given[0] + " " + practitionerName.family;
            detailsUl.appendChild(practitionerLI);
        }

        if(encounter.serviceProvider) {
            providerLI = document.createElement('li');
            providerLI.innerHTML = "Provider: " + encounter.serviceProvider.name
            detailsUl.appendChild(providerLI);
        }

        statusLI = document.createElement('li');
        statusLI.innerHTML = "Status: " + encounter.status;
        detailsUl.appendChild(statusLI);

        encounterLI.appendChild(detailsUl);
        return encounterLI;
    }

})(window);
