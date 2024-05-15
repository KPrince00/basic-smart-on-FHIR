To run this, you'll need Node.js and to run `npm install` at both package.json locations (main directory and src/lib).

Then use `npm run serve` to launch the local server at localhost:9090.

You can reference the FHIR Client library used here: https://docs.smarthealthit.org/client-js/  
Take special notice of the *Debugging* section.  You can turn on more in-depth logs for this app by running `localStorage.debug = "FHIR.*"` in your browser's console.
