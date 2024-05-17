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
            if (smart.hasOwnProperty('patient')) {
                console.log("Huhm...");
                smart.patient.read().then(function(patient) {
                    console.log("Smart patient fetched...");
                    console.log(patient);
                    var gender = patient.gender;

                    var fname = '';
                    var lname = '';

                    if (typeof patient.name[0] !== 'undefined') {
                        if(fname = patient.name[0].given.length) {
                            fname = patient.name[0].given.join(' ');
                        } else {
                            fname = patient.name[0].given;
                        }
                        lname = patient.name[0].family;
                    }

                    var p = defaultPatient();
                    p.birthdate = patient.birthDate;
                    p.gender = gender;
                    p.fname = fname;
                    p.lname = lname;
                    console.log("Patient fetched and resolved!");
                    console.log(p);
                    ret.resolve(p);
                });
            } else {
                console.log("no patient :(");
                onError();
            }
        }

        FHIR.oauth2.ready(onReady, onError);
        return ret.promise();

    };

    function defaultPatient(){
        return {
            fname: {value: ''},
            lname: {value: ''},
            gender: {value: ''},
            birthdate: {value: ''}
        };
    }

    window.drawVisualization = function(p) {
        $('#holder').show();
        $('#loading').hide();
        $('#fname').html(p.fname);
        $('#lname').html(p.lname);
        $('#gender').html(p.gender);
        $('#birthdate').html(p.birthdate);
    };

})(window);
