const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const deepl = require('deepl-node');
const { readFileSync } = require('fs');
const { RecursiveCharacterTextSplitter } = require('langchain.text_splitter');
const { HuggingFaceEmbeddings } = require('langchain_huggingface');
const { FAISS } = require('langchain_community.vectorstores.faiss');
const axios = require('axios');
const { randomInt } = require('crypto');

const auth_key = "fe66732a-52da-4432-9483-56c293dde951:fx";  // Replace with your key
const translator = new deepl.Translator(auth_key);

const app = express();
app.use(express.json());
app.use(cors());

//////////////////PROCESAMIENTO DE CONOCIMIENTO BASE////////////////////////
// Cargar el texto de entrada y dividirlo en fragmentos
function loadAndSplitText(filename) {
    const documentData = readFileSync(filename, 'utf-8');

    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 150,
        chunkOverlap: 10,
        lengthFunction: (text) => text.length
    });

    return textSplitter.splitText(documentData);
}

// Cargar el modelo de embeddings
function loadEmbeddings() {
    return new HuggingFaceEmbeddings({ modelName: "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2" });
}

// Crear el vector store
function createVectorStore(texts, embeddings) {
    return FAISS.fromTexts(texts, embeddings);
}

// Cargar el texto y crear el vector store una vez
const texts = loadAndSplitText('JASATEL_USS.txt');
const embeddings = loadEmbeddings();
const vecDb = createVectorStore(texts, embeddings);
/////////////////////////////////////////////////////////////////////////////////

//------TRADUCCION------

async function traductor(text, lang = 'EN-US') {
    const result = await translator.translateText(text, null, lang);
    return result.text;
}

// Inicializar el cliente de AI21
const url = "https://api.ai21.com/studio/v1/answer";
const apiKey = "CUyyB5bVDgEHUumO7YpNUzKtSgt4T8GG";
const headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "Authorization": `Bearer ${apiKey}`
};

// Manejar las solicitudes POST a la ruta "/logica_bot"
app.post('/logica_bot', [
    body('pregunta').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const pregunta = req.body.pregunta;
    const preguntaTraducida = await traductor(pregunta);
    const semiRespuesta = vecDb.similaritySearch(preguntaTraducida, 3);

    function windowsContext() {
        let windowsContext = '';
        for (const i of semiRespuesta) {
            windowsContext += `${i.pageContent}\n\n`;
        }
        return windowsContext;
    }

    const windowsContextStr = windowsContext();

    function questionCleaner(preguntaTraducida) {
        const innecesaryWords = ["Hello", "!", "hello", "thanks", "thank you", "thank you very much", "Thanks", "Thank you very much", "Thank you"];
        const pattern = new RegExp(innecesaryWords.map(phrase => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gi');
        let cleanedText = preguntaTraducida.replace(pattern, '');
        cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
        return cleanedText;
    }

    const payload = {
        context: windowsContextStr,
        question: `Explain me about, ${questionCleaner(preguntaTraducida)}`
    };

    const respuestaAi21 = await axios.post(url, payload, { headers });
    const respuestaUS = respuestaAi21.data.answer;
    let respuesta = null;

    if (respuestaUS) {
        respuesta = await traductor(respuestaUS, 'ES');
    }

    // PROCESANDO SALUDO - DESPEDIDA
    const userSaludo = ["hola", "buenos días"];
    const userDespedida = ["adiós", "hasta luego"];
    const userGratitud = ["gracias", "muchas gracias"];
    const botBienvenida = ["¡Hola!", "¡Buenos días!"];
    const botSaludo = ["¡Hola de nuevo!", "¡Qué gusto verte de nuevo!"];
    const botDespedida = ["¡Adiós!", "¡Hasta luego!"];
    const botGratitud = ["¡De nada!", "¡Con mucho gusto!"];
    const mensajeAclaracion = ["Lo siento, no entiendo la pregunta."];

    for (const i of userSaludo) {
        if (pregunta.includes(i)) {
            if (!respuestaUS) {
                respuesta = botBienvenida[randomInt(0, botBienvenida.length)];
            } else {
                respuesta = `${botSaludo[randomInt(0, botSaludo.length)]}\n${respuesta}`;
            }
            break;
        } else {
            for (const j of userDespedida) {
                if (pregunta.includes(j)) {
                    if (!respuestaUS) {
                        respuesta = botDespedida[randomInt(0, botDespedida.length)];
                    } else {
                        respuesta = `${respuesta}\n${botDespedida[randomInt(0, botDespedida.length)]}`;
                    }
                    break;
                } else if (respuesta) {
                    break;
                }
            }
        }
    }

    for (const x of userGratitud) {
        if (pregunta.includes(x)) {
            if (!respuestaUS) {
                respuesta = `${botGratitud[randomInt(0, botGratitud.length)]}`;
            } else {
                respuesta = `${respuesta}\n\n${botGratitud[randomInt(0, botGratitud.length)]}`;
            }
            break;
        } else if (!respuesta && !respuestaUS) {
            respuesta = mensajeAclaracion[randomInt(0, mensajeAclaracion.length)];
        }
    }

    res.json({ respuesta });
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
