const axios = require('axios');

exports.voices =  (req, res) => {
    const config = {
        headers: {
            'Ocp-Apim-Subscription-Key': ''
        }
    };

    axios.get('https://eastus.tts.speech.microsoft.com/cognitiveservices/voices/list', config)
    .then(response => {
        res.send(response.data);
    })
    .catch(err => {
        console.log(err);
    });
};

exports.tts = (req, res) => {
    const xmlBody = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
                        <voice name="${req.body.ShortName}">
                            ${req.body.Text}
                        </voice>
                    </speak>`;
    
    const config = {
        headers: {
            'X-Microsoft-OutputFormat': 'riff-48khz-16bit-mono-pcm',
            'Content-Type': 'application/ssml+xml',
            'Ocp-Apim-Subscription-Key': '',
            'User-Agent': 'Text-To-Speech API'
        },
        responseType: 'stream'
    };
    
    axios.post('https://eastus.tts.speech.microsoft.com/cognitiveservices/v1', xmlBody, config)
    .then(response => {
        response.data.pipe(res);
    })
    .catch(err => {
        console.log(err);
    });
};