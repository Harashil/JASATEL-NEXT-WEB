from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores.faiss import FAISS
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random
import deepl
import re 

auth_key = "fe66732a-52da-4432-9483-56c293dde951:fx"  # Replace with your key
translator = deepl.Translator(auth_key)



app = FastAPI()

#////////////////PROCESAMIENTO DE CONOCIMIENTO BASE////////////////////////
# Cargar el texto de entrada y dividirlo en fragmentos
def load_and_split_text(filename):
    with open(filename, 'r') as file:
        document_data = file.read()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=150,
        chunk_overlap=10,
        length_function=len
    )

    return text_splitter.split_text(document_data)

# Cargar el modelo de embeddings
def load_embeddings():
    return HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")

# Crear el vector store
def create_vector_store(texts, embeddings):
    return FAISS.from_texts(texts, embeddings)

# Cargar el texto y crear el vector store una vez
texts = load_and_split_text('JASATEL_USS.txt')
embeddings = load_embeddings()
vec_db = create_vector_store(texts, embeddings)
#///////////////////////////////////////////////////////////////////////////////

# Definir la entrada de datos para la API
class InputData(BaseModel):
    pregunta: str

# Permitir CORS para todas las solicitudes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

#------TRADUCCION------

  # "Bonjour, le monde !"

def traductor(text, lang='EN-US'):
    
    result = translator.translate_text(text, target_lang=lang)
    return result.text

#DATOS PARA EL SALUDO
user_saludo=["buenos días", "buenos dias", "buenas tardes", "buenas noches", "hola", "ola", "hola!", "Hola","Hola!", "buenas", "mucho gusto", "saludos"]
user_despedida=["chau", "adios", "Adios", "nos vemos", "hasta pronto"]
user_gratitud=["gracias","Gracias","agradezco","graciass","gracias.","Gracias.", "garcias", "Garcias"]
bot_bienvenida= ["¡Hola y bienvenido a JASATEL!👋\n ¿Como puedo ayudarlo?", "¡Saludos futuro cliente!😁\n¿Como puedo ayudarlo?", "   ¡Mucho gusto!😊\nEstoy aquí para ayudar."]
bot_saludo=["¡Hola, un gusto poder atenderlo!", "¡Hola!","¡Saludos!"]
bot_despedida=["\n¡Gracias por comunicarte con nosotros!", "\n¡Hasta pronto!", "\n¡Nos Vemos!", "\nGracias por su tiempo ¡Nos vemos!"]
bot_gratitud=["    ¡Gracias a usted por su       comunicacion!😄","Para información mas detallada no dude en contact@rnos.📞\nEstamos a su servicio.😉","Estamos a asu servicio😄"]

mensaje_aclaracion=["Lo siento 😓\n¿Podrías ser mas específico con tu pregunta?","Perdón.\nNo encuentro respuesta a tu pregunta...\n¿Podrías brindarme más detalles?🤔"]
# Inicializar el cliente de AI21
url = "https://api.ai21.com/studio/v1/answer"
api_key = "CUyyB5bVDgEHUumO7YpNUzKtSgt4T8GG"
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "Authorization": "Bearer CUyyB5bVDgEHUumO7YpNUzKtSgt4T8GG"
}

#///////////////////////////////////////////////////////////////
# Manejar las solicitudes POST a la ruta "/pregunta"
@app.post("/pregunta")
def obtener_pregunta(user_input: InputData):
    pregunta = user_input.pregunta
        
    pregunta_traducida=traductor(pregunta)
    semi_respuesta = vec_db.similarity_search(pregunta_traducida, 3)
     
    def windowsContext():
        windows_context = ''
        for i in semi_respuesta:
            windows_context += f"{i.page_content}\n\n"
        return windows_context
    windows_context= windowsContext()
    def questionCleaner(pregunta_traducida=pregunta_traducida):
        innecesaryWords = ["Hello", "!","hello", "thanks", "thank you", "thank you very much", "Thanks", "Thank you very much", "Thank you"]
        pattern = '|'.join(re.escape(phrase) for phrase in innecesaryWords)
        # Usar la expresión regular para reemplazar las frases con una cadena vacía
        cleaned_text = re.sub(pattern, '', pregunta_traducida)
        # Eliminar espacios en blanco adicionales
        cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
        return cleaned_text

    # Obtener la respuesta del modelo
    payload = {
    "context": windows_context,
    "question": f"Explain me about, {questionCleaner()}"
    }
    respuesta_ai21 = requests.post(url, json=payload, headers=headers)
    # Acceder a la clave "answer"
    
    respuesta_US = respuesta_ai21.json()["answer"]
    respuesta=None

    if respuesta_US!=None:
        respuesta= traductor(respuesta_US,'ES')

    #PROCESANDO SALUDO - DESPEDIDA
    for i in user_saludo:
        if i in pregunta:
            if respuesta_US==None:
                respuesta= random.choice(bot_bienvenida)
            else:
                respuesta= f"{random.choice(bot_saludo)}\n{respuesta}"
            break         
        
        else:
            for j in user_despedida:
                if j in pregunta:
                    if respuesta_US==None:
                        respuesta=random.choice(bot_despedida)
                    else:
                        respuesta= f"{respuesta}\n{random.choice(bot_despedida)}"      
                    break
                elif respuesta!=None:
                    break
                
    for x in user_gratitud:
        if x in pregunta:
            if respuesta_US==None:
                respuesta=f"{random.choice(bot_gratitud)}"
            else:
                respuesta= f"{respuesta}\n\n{random.choice(bot_gratitud)}"
            break
        elif respuesta==None and respuesta_US==None:
             respuesta= random.choice(mensaje_aclaracion)
        
    return {"respuesta":windows_context}    








