const { response, request } = require('express')
const { Configuration, OpenAIApi } = require('openai')


const config = new Configuration({
    organization: "org-qDtjJ9iiKtsEWBVn9LtAnKur",
    apiKey: process.env.API_KEY_OPENIA
})

const openia = new OpenAIApi(config)

const chatGptDavinci = async (req=request,res=response) => {
    const { pregunta } = req.body;
    const respuesta = await openia.createCompletion({
        "model": "text-davinci-003",
        "prompt": pregunta,
        "max_tokens": 2048,
        "temperature": 0.7
    })
    res.json({
        msg:'post API - ChatGPT-Controlador',
        body: respuesta.data
    })
}

const chatGptTurbo = async (req=request,res=response) => {
    const { pregunta } = req.body;
    const completion = await openia.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: pregunta}],
      });
      const data = {
        'prompt': pregunta,
        'max_tokens': 100
      };
      res.json({
        msg:'post API - ChatGPT-Controlador',
        body: completion.data
    })
   
}

const getAlgo =  (req=request,res=response) =>{
    data = {
        name:'Freddy',
        lastname: 'Arriaga',
        age: 32,
        profession: 'Desarrollador Full Stack'
    }
    res.json({
        msg:'Get API - Controlador',
        body: data
    })
}

module.exports = {
    chatGptDavinci,
    chatGptTurbo,
    getAlgo
}