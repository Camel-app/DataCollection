if(usingMongoDB){ // TODO: ask about that
    async function fetchData(URL) {
        const dataRaw = await fetch(URL);
        if(dataRaw.status != 200){
            return;
        }

        const data = await dataRaw.json()
        config = JSON.parse(data.config);
    }
    
    const queryString2 = window.location.search;
    const urlParams2 = new URLSearchParams(queryString2);
    const link2 = urlParams2.get('link');
    fetchData(link2);
}
