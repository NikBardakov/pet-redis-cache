const { v4: uuidv4 } = require('uuid');
main ();

async function main() {

    await generateData();
    await getData(`http://${process.env.APP_HOST || 'localhost'}:8080/cacheddata`,'The first trying to get data with empty cache');
    await getData(`http://${process.env.APP_HOST || 'localhost'}:8080/cacheddata`,'The second trying to get data with fullfill cache');
    await getData(`http://${process.env.APP_HOST || 'localhost'}:8080/cacheddata`, 'The therd trying to get data in order to confirm the result');
    await getData(`http://${process.env.APP_HOST || 'localhost'}:8080/postgresdata`,'The first trying to get data not using cache');
    await getData(`http://${process.env.APP_HOST || 'localhost'}:8080/postgresdata`,'The second trying to get data not using cache in order to confirm the result');
}

async function generateData ()  {
    console.log ('Generating data is starting')
    const start = Date.now();
    let featchArray = []
    for(let i=1; i<500;i++) {

        const fetchData = fetch(`http://${process.env.APP_HOST || 'localhost'}:8080/postgresdata`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "uuid": uuidv4()})
        })
        featchArray = [...featchArray,fetchData]
        
    }
    await Promise.all(featchArray)
        .then(() => {
            const millis = Date.now() - start;
            console.log(`Process has taken ${millis} ms`);
        })

}

async function getData (urlPath, message)  {
    console.log (message)
    const start = Date.now();
    let featchArray = []
    for(let i=1; i<500;i++) {
        const url = urlPath + '/' + i
        const fetchData = fetch(url)
        featchArray = [...featchArray,fetchData]
        
    }
    await Promise.all(featchArray)
        .then(() => {
            const millis = Date.now() - start;
            console.log(`Process has taken ${millis}ms`);
        })

}