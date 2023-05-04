const axios = require('axios');

exports.voices =  (req, res) => {
    const config = {
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY
        }
    };

    axios.get('https://eastus.tts.speech.microsoft.com/cognitiveservices/voices/list', config)
    .then(response => {
        res.send(response.data);
    })
    .catch(err => {
        console.log(err);

        switch(err.response.status) {
            case 400:
                res.status(400).send();
                break;
            case 401:
            case 429:
            case 502:
            default:
                res.status(500).send();
        }
    });
};

exports.tts = (req, res) => {
    const xmlBody = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">
                        <voice name="${req.body.ShortName}">
                            <mstts:express-as style="${req.body.Style}">
                                ${req.body.Text}
                            </mstts:express-as>
                        </voice>
                    </speak>`;
    
    const config = {
        headers: {
            'X-Microsoft-OutputFormat': 'riff-48khz-16bit-mono-pcm',
            'Content-Type': 'application/ssml+xml',
            'Ocp-Apim-Subscription-Key': process.env.SUBSCRIPTION_KEY,
            'User-Agent': 'Text-To-Speech API'
        },
        responseType: 'stream'
    };
    
    axios.post('https://eastus.tts.speech.microsoft.com/cognitiveservices/v1', xmlBody, config)
    .then(response => {
        res.setHeader('Content-Disposition', 'attachment; filename=text-to-speech.wav');
        response.data.pipe(res);
    })
    .catch(err => {
        console.log(err);

        switch(err.response.status) {
            case 400:
            case 403:
                res.status(400).send();
                break;
            case 401:
            case 415:
            case 429:
            case 502:
            default:
                res.status(500).send();
        }
    });
};