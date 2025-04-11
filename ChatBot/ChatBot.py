import random
from corpus import corpus, palabras_positivas, palabras_negativas

def obtener_respuesta_carismatica(categoria, mensaje_usuario):
    """
    Obtiene una respuesta carismática basada en la categoría y personaliza algunos elementos.
    
    Args:
        categoria (str): La categoría de intención detectada
        mensaje_usuario (str): El mensaje original del usuario
        
    Returns:
        str: Una respuesta carismática personalizada
    """
    respuestas_posibles = corpus[categoria]["respuestas"]
    respuesta_base = random.choice(respuestas_posibles)
    
    # Personalizar la respuesta con el nombre del usuario si se menciona
    if "me llamo" in mensaje_usuario.lower():
        partes = mensaje_usuario.lower().split("me llamo")
        if len(partes) > 1:
            nombre = partes[1].strip().split()[0].capitalize()
            saludos_personalizados = [
                f"Por cierto, ¡es un gusto conocerte, {nombre}!",
                f"¡Encantado de conocerte, {nombre}!",
                f"¡Qué buen nombre, {nombre}!"
            ]
            return respuesta_base + " " + random.choice(saludos_personalizados)
    
    # Para la categoría trabajo, añadir un comentario de ánimo
    if categoria == "trabajo_estudio" and "trabajo" in mensaje_usuario.lower():
        comentarios_trabajo = [
            "¡Espero que no estés trabajando demasiado duro!",
            "Recuerda tomar descansos, ¡el trabajo no lo es todo!",
            "¡Ojalá tu jornada laboral no sea muy pesada hoy!"
        ]
        if random.random() < 0.7:  # 70% de probabilidad de añadir este comentario
            return respuesta_base + " " + random.choice(comentarios_trabajo)
    
    # Añadir emojis ocasionalmente para dar más carisma
    if random.random() < 0.3:  # 30% de probabilidad
        emojis = ["😊", "👍", "✨", "🙌", "💯", "🎉", "⭐", "💪"]
        return respuesta_base + " " + random.choice(emojis)
    
    return respuesta_base

def detectar_pregunta(mensaje):
    """
    Detecta si el mensaje es una pregunta directa y determina su tipo.
    
    Args:
        mensaje (str): El mensaje del usuario
        
    Returns:
        str or None: Tipo de pregunta o None si no es una pregunta
    """
    mensaje = mensaje.lower()
    
    # Detectar preguntas sobre el chatbot
    preguntas_chatbot = ["como estas", "que tal estas", "como te va", "tu como estas", "y tu", "que tal tu"]
    if any(pregunta in mensaje for pregunta in preguntas_chatbot):
        return "estado_chatbot"
    
    # Detectar preguntas sobre capacidades
    preguntas_capacidades = ["que puedes hacer", "para que sirves", "como me ayudas", "que sabes hacer"]
    if any(pregunta in mensaje for pregunta in preguntas_capacidades):
        return "sobre_chatbot"
    
    # Verificar si es una pregunta o una afirmación
    tiene_interrogacion = "?" in mensaje
    empieza_con_interrogativa = any(mensaje.startswith(palabra) for palabra in ["que", "como", "cuando", "donde", "cual", "quien"])
    
    # Solo para preguntas específicas sobre el clima actual, hora o fecha
    if tiene_interrogacion or empieza_con_interrogativa:
        if any(patron in mensaje for patron in corpus["preguntas_hora"]["patrones"]):
            return "preguntas_hora"
        
        if any(patron in mensaje for patron in corpus["preguntas_fecha"]["patrones"]):
            return "preguntas_fecha"
        
        # Solo si es una pregunta explícita sobre el clima actual
        palabras_clima_actual = ["como esta", "cual es", "que tal esta", "pronostico para"]
        if any(patron in mensaje for patron in corpus["preguntas_tiempo"]["patrones"]) and any(palabra in mensaje for palabra in palabras_clima_actual):
            return "preguntas_tiempo"
    
    # Para comentarios sobre el clima, usar la categoría "clima"
    if any(patron in mensaje for patron in corpus["clima"]["patrones"]) and not tiene_interrogacion and not empieza_con_interrogativa:
        return "clima"
    
    # Detectar otras preguntas por signos de interrogación o palabras interrogativas
    palabras_interrogativas = ["que", "como", "cuando", "donde", "por que", "cual", "quien"]
    
    if tiene_interrogacion or any(palabra + " " in mensaje for palabra in palabras_interrogativas):
        # Intentar categorizar la pregunta
        for categoria, datos in corpus.items():
            if "patrones" in datos:
                for patron in datos["patrones"]:
                    if patron in mensaje:
                        return categoria
    
    return None

def analizar_sentimiento_avanzado(mensaje):
    """
    Analiza el sentimiento del mensaje, detectando contradicciones.
    
    Args:
        mensaje (str): El mensaje del usuario
        
    Returns:
        tuple: (sentimiento, tiene_contradiccion)
    """
    mensaje = mensaje.lower()
    
    # Verificar si hay conectores adversativos (pero, aunque, sin embargo)
    for conector in corpus["sentimientos_mixtos"]["patrones"]:
        if conector in mensaje:
            # Dividir el mensaje en partes
            partes = mensaje.split(conector, 1)  # Limitar a 1 división
            if len(partes) == 2:
                primera_parte = partes[0]
                segunda_parte = partes[1]
                
                # Buscar palabras negativas en la segunda parte
                for palabra_negativa in palabras_negativas:
                    if palabra_negativa in segunda_parte:
                        return "negativo", True
                
                # Buscar palabras positivas en la segunda parte
                for palabra_positiva in palabras_positivas:
                    if palabra_positiva in segunda_parte:
                        return "positivo", True
    
    # Si no hay contradicción, analizar todo el mensaje
    pos_count = 0
    neg_count = 0
    
    # Contar palabras positivas
    for palabra_positiva in palabras_positivas:
        if palabra_positiva in mensaje:
            pos_count += 1
            
    # Contar palabras negativas
    for palabra_negativa in palabras_negativas:
        if palabra_negativa in mensaje:
            neg_count += 1
    
    # Palabras específicas de estado de ánimo negativo
    negativas_especificas = ["sin animos", "no tengo animos", "desanimado", "cansado"]
    for neg_especifica in negativas_especificas:
        if neg_especifica in mensaje:
            neg_count += 3  # Dar más peso a estas expresiones
    
    # Determinar sentimiento general
    if pos_count > neg_count:
        return "positivo", False
    elif neg_count > pos_count:
        return "negativo", False
    else:
        return "neutral", False

def detectar_intencion(mensaje, sentimiento, tiene_contradiccion):
    """
    Detecta la intención del usuario basándose en el mensaje y el sentimiento.
    
    Args:
        mensaje (str): El mensaje del usuario
        sentimiento (str): El sentimiento detectado
        tiene_contradiccion (bool): Si se detectó contradicción
        
    Returns:
        str: La categoría de intención detectada
    """
    mensaje = mensaje.lower()
    
    # Primero verificar si es una pregunta directa
    tipo_pregunta = detectar_pregunta(mensaje)
    if tipo_pregunta:
        return tipo_pregunta
    
    # Priorizar manejo de contradicciones
    if tiene_contradiccion:
        if sentimiento == "negativo":
            return "estado_animo_negativo"
        elif sentimiento == "positivo":
            return "estado_animo_positivo"
        return "sentimientos_mixtos"
    
    # Verificar frases completas de estado de ánimo negativo
    frases_negativas = ["sin animos", "no tengo animos", "no me siento bien"]
    for frase in frases_negativas:
        if frase in mensaje:
            return "estado_animo_negativo"
    
    # Verificar despedida
    if any(despedida in mensaje for despedida in corpus["despedida"]["patrones"]):
        return "despedida"
    
    # Buscar coincidencias en patrones
    coincidencias = {}
    
    for categoria, datos in corpus.items():
        if categoria == "default" or categoria == "sentimientos_mixtos":
            continue
            
        # Contar coincidencias para cada categoría
        coincidencias[categoria] = 0
        if "patrones" in datos:
            for patron in datos.get("patrones", []):
                if patron in mensaje:
                    coincidencias[categoria] += 1
    
    # Encontrar la categoría con más coincidencias
    max_coincidencias = 0
    mejor_categoria = "default"
    
    for categoria, num_coincidencias in coincidencias.items():
        if num_coincidencias > max_coincidencias:
            max_coincidencias = num_coincidencias
            mejor_categoria = categoria
    
    # Si encontramos coincidencias pero el sentimiento es contradictorio
    if mejor_categoria != "default":
        # Dar prioridad al sentimiento sobre la categoría detectada
        if sentimiento == "negativo" and mejor_categoria != "estado_animo_negativo":
            return "estado_animo_negativo"
        elif sentimiento == "positivo" and mejor_categoria != "estado_animo_positivo":
            return "estado_animo_positivo"
        return mejor_categoria
                
    # Si no hay coincidencias pero hay un sentimiento claro
    if sentimiento == "positivo":
        return "estado_animo_positivo"
    elif sentimiento == "negativo":
        return "estado_animo_negativo"
                
    return "default"

def mantener_contexto(mensaje_usuario, respuesta_anterior):
    """
    Añade una posible respuesta contextual basada en la conversación.
    
    Args:
        mensaje_usuario (str): El mensaje actual del usuario
        respuesta_anterior (str): La respuesta anterior del chatbot
        
    Returns:
        str or None: Una respuesta contextual o None
    """
    # Si el usuario responde con mensajes cortos, ofrecer respuestas más elaboradas
    mensaje = mensaje_usuario.lower()
    palabras = mensaje.split()
    
    if len(palabras) <= 2:
        respuestas_cortas = [
            "si", "no", "ok", "vale", "claro", "bueno", "talvez", "quiza", "por supuesto"
        ]
        
        if mensaje in respuestas_cortas:
            # Si la respuesta anterior contenía una pregunta
            if "?" in respuesta_anterior:
                if mensaje in ["si", "claro", "vale", "ok", "por supuesto"]:
                    respuestas_afirmativas = [
                        "¡Genial! Me encanta tu entusiasmo. ¿Te gustaría profundizar más en eso?",
                        "¡Excelente! Es bueno saber que estamos en sintonía. ¿Hay algo más que quisieras compartir?",
                        "¡Perfecto! Me alegra que estemos de acuerdo. ¿Qué más te gustaría conversar?",
                        "¡Qué bien! Me gusta tu actitud positiva. ¿Hay algo más en lo que pueda ayudarte hoy?"
                    ]
                    return random.choice(respuestas_afirmativas)
                elif mensaje in ["no", "talvez", "quiza"]:
                    respuestas_negativas = [
                        "Entiendo, no pasa nada. ¿Hay algún otro tema del que prefieras hablar?",
                        "No hay problema. ¿Te gustaría hablar de algo diferente?",
                        "Está bien, respeto eso. ¿Hay alguna otra cosa en la que pueda ayudarte?",
                        "Comprendo perfectamente. ¿Hay algún otro tema que te interese más?"
                    ]
                    return random.choice(respuestas_negativas)
    
    return None

def chatbot():
    """
    Función principal del chatbot que maneja la interacción con el usuario.
    """
    print("¡Hola! Soy tu chatbot. Cuéntame, ¿cómo estuvo tu día? (escribe 'salir' para terminar)")
    
    ultima_respuesta = ""
    
    while True:
        mensaje_usuario = input("Tú: ")
        
        if mensaje_usuario.lower() in ['salir', 'adios', 'chao', 'bye']:
            print("Chatbot: ¡Ha sido un placer charlar contigo! Espero verte pronto por aquí de nuevo. ¡Que tengas un día fantástico!")
            break
        
        # Primero verificar si es una respuesta corta y contextual
        respuesta_contextual = mantener_contexto(mensaje_usuario, ultima_respuesta)
        
        if respuesta_contextual:
            print(f"Chatbot: {respuesta_contextual}")
            ultima_respuesta = respuesta_contextual
            continue
        
        # Analizar sentimiento con detección de contradicciones    
        sentimiento, tiene_contradiccion = analizar_sentimiento_avanzado(mensaje_usuario)
        
        # Detectar intención considerando el sentimiento y posibles contradicciones
        intencion = detectar_intencion(mensaje_usuario, sentimiento, tiene_contradiccion)
        
        # Obtener una respuesta carismática
        respuesta = obtener_respuesta_carismatica(intencion, mensaje_usuario)
        
        print(f"Chatbot: {respuesta}")
        ultima_respuesta = respuesta

if __name__ == "__main__":
    chatbot()