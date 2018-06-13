import ToneAnalyzer from 'watson-developer-cloud/tone-analyzer/v3';

let credentials = {
    url: "https://gateway.watsonplatform.net/tone-analyzer/api",
    username: process.env.WATSON_UN,
    password: process.env.WATSON_PW,
    version: '2017-09-21'
}

export default new ToneAnalyzer(credentials);