const myScope = {
    client: null,
}

FHIR.oauth2.ready().then(main);

function main(client) {
    console.log("Received client from ready():", client);
    myScope.client = client;
    myScope.client.patient.read().then(console.log);
}