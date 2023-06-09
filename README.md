# Text-To-Speech API
The Text-To-Speech API allows you to get a list of voices and convert text into synthesized speech using Microsoft Azure Cognitive Services. You can test this API using the playground at the [`http://159.223.123.107:3000/docs`](http://159.223.123.107:3000/docs) endpoint.

## Get a List of Voices
To get a full list of available voices, you can send a `GET` request to the [`http://159.223.123.107:3000/voices`](http://159.223.123.107:3000/voices) endpoint.

### Request Body
A body is not required for `GET` requests to this endpoint.

### Sample Request
```
GET /voices HTTP/1.1
Host: 159.223.123.107:3000
```

### Sample Response
You will receive a response with a JSON body that contains a full list of available voices, which includes their name, gender, locale, and many other details.
```
[
  {
    "Name": "Microsoft Server Speech Text to Speech Voice (af-ZA, AdriNeural)",
    "DisplayName": "Adri",
    "LocalName": "Adri",
    "ShortName": "af-ZA-AdriNeural",
    "Gender": "Female",
    "Locale": "af-ZA",
    "LocaleName": "Afrikaans (South Africa)",
    "SampleRateHertz": "48000",
    "VoiceType": "Neural",
    "Status": "GA",
    "WordsPerMinute": "147"
  },
  ...,
  {
    "Name": "Microsoft Server Speech Text to Speech Voice (en-US, JennyNeural)",
    "DisplayName": "Jenny",
    "LocalName": "Jenny",
    "ShortName": "en-US-JennyNeural",
    "Gender": "Female",
    "Locale": "en-US",
    "LocaleName": "English (United States)",
    "StyleList": [
        "assistant",
        "chat",
        "customerservice",
        "newscast",
        "angry",
        "cheerful",
        "sad",
        "excited",
        "friendly",
        "terrified",
        "shouting",
        "unfriendly",
        "whispering",
        "hopeful"
    ],
    "SampleRateHertz": "48000",
    "VoiceType": "Neural",
    "Status": "GA",
    "WordsPerMinute": "152"
  },
  ...,
  {
    "Name": "Microsoft Server Speech Text to Speech Voice (zu-ZA, ThembaNeural)",
    "DisplayName": "Themba",
    "LocalName": "Themba",
    "ShortName": "zu-ZA-ThembaNeural",
    "Gender": "Male",
    "Locale": "zu-ZA",
    "LocaleName": "Zulu (South Africa)",
    "SampleRateHertz": "48000",
    "VoiceType": "Neural",
    "Status": "GA",
    "WordsPerMinute": "90"
  }
]
```

### HTTP Status Codes
| HTTP Status Code | Description | Possible Reason |
| ------------- | ------------- | ------------- |
| 200 | OK | The request was successful. |
| 400 | Bad Request | The request was malformed. |
| 500 | Internal Server Error | There was a server-side problem. |

## Convert Text to Speech
To convert text to speech, you can send a `POST` request to the `http://159.223.123.107:3000/text-to-speech` endpoint.

### Request Body
The JSON body of the request should include the `ShortName` of the voice you have chosen, the optional speaking `Style` (must be supported by the voice), and the `Text` you would like to convert to speech.
```
{
    "ShortName": "en-US-JennyNeural",
    "Style": "terrified",
    "Text": "This text will be converted to speech."
}
```

### Sample Request
```
POST /text-to-speech HTTP/1.1
Host: 159.223.123.107:3000

{
    "ShortName": "en-US-JennyNeural",
    "Style": "terrified",
    "Text": "This text will be converted to speech."
}
```

### Sample Response
You will receive a response with its body containing an audio file of the text converted to speech.

### HTTP Status Codes
| HTTP Status Code | Description | Possible Reason |
| ------------- | ------------- | ------------- |
| 200 | OK | The request was successful. |
| 400 | Bad Request | The request was malformed. A required value was likely invalid, missing, empty, or null. |
| 500 | Internal Server Error | There was a server-side problem. |