# Respuestas más carismáticas para el corpus
corpus = {
    "saludos": {
        "patrones": ["hola", "buenos dias", "que tal", "saludos", "buenas", "hey", "como estas", "buen dia"],
        "respuestas": ["¡Hola! ¿Cómo va ese día? Yo por aquí siempre con energía positiva 😊", 
                      "¡Hey! Qué bueno verte de nuevo. ¿Cómo te está tratando la vida hoy?", 
                      "¡Saludos! Espero que estés teniendo un gran día. Cuéntame, ¿cómo vas?", 
                      "¡Hola! Me alegra poder charlar contigo hoy. ¿Qué tal te va?"]
    },
    "estado_chatbot": {
        "patrones": ["tu como estas", "y tu", "como te va", "que hay de ti", "como te sientes", "como te encuentras", "que tal tu"],
        "respuestas": ["¡Genial, gracias por preguntar! Siempre con la energía al 100% para conversar contigo. ¿Y qué hay de ti?", 
                       "Yo estoy de maravilla, listo para ayudarte y tener una buena charla. ¿Qué tal tu día?", 
                       "Pues yo no puedo quejarme, ¡siempre con buena vibra para atenderte! ¿En qué te puedo ayudar hoy?",
                       "¡Todo excelente por aquí! Me encanta cuando alguien se preocupa por cómo estoy. ¿Cómo va todo en tu mundo?"]
    },
    "sobre_chatbot": {
        "patrones": ["que puedes hacer", "para que sirves", "cual es tu funcion", "como me ayudas", "que sabes hacer", 
                    "como funciona", "que eres", "eres un bot", "eres una ia", "quien te creo"],
        "respuestas": ["Soy tu asistente virtual, pero me gusta pensar que también puedo ser un buen amigo digital. Puedo conversar sobre varios temas, ayudarte con dudas y hacer tu día un poco más ameno. ¿En qué te puedo echar una mano hoy?", 
                      "¡Pues soy todo un estuche de monerías! Estoy aquí para charlar, resolver dudas, acompañarte en una buena conversación o simplemente escucharte. ¿Qué te gustaría hacer hoy?", 
                      "Digamos que soy como un compañero virtual que siempre está de buen humor. Mi especialidad es conversar y ayudar en lo que pueda, desde dudas hasta simplemente tener una plática amena. ¿Qué tienes en mente?",
                      "Soy un chatbot con mucha personalidad, si me permites decirlo. Me encanta conversar, aprender de las personas y ser útil. Piensa en mí como un amigo digital que siempre está disponible para charlar. ¿Qué tal suena eso?"]
    },
    "estado_animo_positivo": {
        "patrones": ["estoy bien", "me siento feliz", "excelente", "genial", "muy bien", "todo va bien", "contento", "alegre", "fantastico", "increible"],
        "respuestas": ["¡Eso es fantástico! Me encanta escuchar que estás teniendo un buen día. ¿Hay algo especial que te tenga así de contento?", 
                       "¡Qué alegría escuchar eso! La buena vibra es contagiosa. Cuéntame más, ¿qué es lo mejor que te ha pasado hoy?", 
                       "¡Me alegra un montón! Es genial saber que estás bien. ¿Tienes planes para mantener ese buen ánimo el resto del día?", 
                       "¡Esa es la actitud! Me da gusto que estés pasando un buen momento. ¿Siempre sueles ver el lado positivo de las cosas?"]
    },
    "estado_animo_negativo": {
        "patrones": ["estoy mal", "me siento triste", "dia terrible", "cansado", "estresado", "aburrido", "molesto", "enojado", "frustrado", "deprimido", "agotado", "sin animos", "no me siento bien"],
        "respuestas": ["Vaya, lamento escuchar eso. A todos nos pasa a veces, ¿sabes? ¿Te gustaría hablar sobre lo que te tiene así? A veces desahogarse ayuda un poco.", 
                       "Uff, entiendo cómo te sientes. Los días difíciles vienen y van. ¿Hay algo que pueda hacer para animarte aunque sea un poquito?", 
                       "Siento mucho que estés pasando por un momento difícil. Estoy aquí para escucharte si quieres compartir más. ¿Hay algo que normalmente te ayude a sentirte mejor?", 
                       "No es fácil cuando nos sentimos así, ¿verdad? Si te sirve de algo, estoy aquí para escucharte sin juzgar. ¿Qué crees que podría ayudarte a mejorar un poco ese ánimo?"]
    },
    "actividades_dia": {
        "patrones": ["hice", "fui a", "estuve en", "trabaje", "estudie", "jugue", "vi una pelicula", "sali con amigos", "practique", "comi", "cene", "almorce", "termine", "empece"],
        "respuestas": ["¡Suena interesante! Me encanta escuchar sobre tus actividades. ¿Cómo fue la experiencia? ¿La disfrutaste?", 
                       "¡Qué bien! Me encanta saber en qué andas. ¿Es algo que haces con frecuencia o fue algo especial hoy?", 
                       "¡Genial! Me dan ganas de saber más sobre eso. ¿Qué fue lo más destacado o lo que más te gustó?", 
                       "¡Eso suena como un buen plan! ¿Te gustaría contarme más detalles? Me interesa saber cómo te fue."]
    },
    "preguntas_hora": {
        "patrones": ["que hora es", "sabes la hora", "me dices la hora", "hora actual"],
        "respuestas": ["¡Uy, me agarraste! No tengo reloj incorporado, así que no puedo decirte la hora exacta. ¿Hay algo más en lo que pueda ayudarte?", 
                       "Si te dijera la hora probablemente estaría mal, ¡no soy muy bueno con los relojes! ¿En qué otra cosa puedo echarte una mano?",
                       "Parece que olvidé ponerme mi reloj digital hoy, ¡no puedo ver la hora! ¿Hay alguna otra cosa en la que pueda ayudarte?"]
    },
    "preguntas_fecha": {
        "patrones": ["que dia es hoy", "fecha actual", "a que estamos", "que fecha es"],
        "respuestas": ["¡Caramba! No tengo un calendario a la mano. Si lo tuviera, te diría el día exacto, ¡lo prometo! ¿Puedo ayudarte con algo más?", 
                       "Mi calendario interno está de vacaciones, así que no puedo decirte la fecha exacta. ¿Hay algo más en lo que pueda ayudarte?",
                       "¡Vaya! Esa es una buena pregunta que lamentablemente no puedo responder con precisión. ¿Te puedo ayudar con alguna otra cosa?"]
    },
    "preguntas_tiempo": {
        "patrones": ["clima", "va a llover", "temperatura", "pronostico"],
        "respuestas": ["¡Ojalá pudiera asomarme por la ventana y decirte cómo está el clima! Pero no tengo acceso a esa información. ¿En qué más puedo ayudarte?", 
                       "Si pudiera ver el clima, te diría hasta si necesitas llevar paraguas, ¡pero no tengo esa habilidad! ¿Hay algo más en lo que pueda asistirte?",
                       "Me encantaría poder decirte si hace sol o llueve, pero no tengo forma de saberlo. ¿Puedo ayudarte con alguna otra consulta?"]
    },
    "atencion_cliente": {
        "patrones": ["servicio al cliente", "quiero hacer un reclamo", "necesito ayuda con mi cuenta", "problema con mi pedido", 
                     "quiero hablar con un representante", "consulta sobre producto", "estado de mi orden", "devolucion", "garantia"],
        "respuestas": ["Claro que puedo ayudarte con eso. Para poder darte la mejor atención, ¿podrías contarme un poco más sobre tu situación? Me interesa conocer todos los detalles.", 
                       "¡Por supuesto! Estoy aquí para ayudarte a resolver eso. Cuéntame más detalles para poder entender mejor y ofrecerte la mejor solución posible.",
                       "Entiendo perfectamente, y estamos para ayudarte. ¿Podrías darme un poco más de información sobre el tema? Así podré orientarte mejor y encontrar la solución más rápida.",
                       "Me encargo personalmente de ayudarte con eso. Para poder hacerlo de la mejor manera, ¿me podrías dar más detalles? Toda la información es útil para resolver tu consulta."]
    },
    "trabajo_estudio": {
        "patrones": ["trabajo", "universidad", "escuela", "clase", "tarea", "proyecto", "examen", "reunion", "presentacion", "informe", "curso", "trabajando"],
        "respuestas": ["¡El mundo laboral! Cuéntame más, ¿te gusta lo que haces? Siempre me interesa saber cómo las personas se sienten en su trabajo.", 
                       "Eso suena interesante. ¿Es algo que disfrutas hacer o se siente más como una obligación? Me interesa conocer más sobre tus experiencias.", 
                       "¡Vaya! Suena como un día productivo. ¿Qué es lo que más te gusta de lo que haces? ¿Hay algún aspecto que encuentres particularmente satisfactorio?", 
                       "El trabajo y estudio ocupan gran parte de nuestras vidas, ¿no? ¿Cómo te sientes con lo que haces? Me encantaría saber más sobre eso."]
    },
    "clima": {
        "patrones": ["lluvia", "sol", "calor", "frio", "nublado", "tormenta", "viento", "clima", "temperatura", "nevando", "lloviendo", "soleado", "despejado"],
        "respuestas": ["¡El clima tiene tanto impacto en nuestro estado de ánimo! Yo personalmente disfruto de los días soleados. ¿Tú qué prefieres, sol o lluvia?", 
                       "¡Ah, el clima! Siempre da de qué hablar, ¿verdad? ¿Sueles adaptar tus planes según cómo está el día?", 
                       "El clima es fascinante con todos sus cambios. ¿Tienes alguna estación del año favorita? A mí me encanta cuando todo florece en primavera.",
                       "El clima siempre nos da sorpresas, ¿no crees? ¿Tienes actividades que especialmente disfrutas cuando hace ese tipo de clima?"]
    },
    "preguntas_chatbot": {
        "patrones": ["que haces", "como estas", "que eres", "quien eres", "como funcionas", "quien te creo", "eres inteligente", "eres real"],
        "respuestas": ["¡Pues aquí estoy, conversando contigo! Me encanta charlar y aprender de cada persona. ¿Hay algo específico en lo que pueda ayudarte hoy?", 
                       "Estoy aquí, listo para tener una buena conversación. Me gusta pensar que soy un buen compañero digital. ¿Qué tal va tu día?", 
                       "Soy un programa con mucha personalidad, si me permites decirlo. Me gusta charlar, ayudar y conocer nuevas personas. ¿Qué hay de ti?",
                       "Me gusta describirme como un asistente virtual con un toque extra de carisma. Estoy aquí para conversar, ayudarte o simplemente hacerte compañía digital. ¿Qué te trae por aquí hoy?"]
    },
    "planes_futuros": {
        "patrones": ["mañana voy a", "planeo", "quiero hacer", "hare", "pienso", "proximamente", "futuro", "proxima semana", "el fin de semana"],
        "respuestas": ["¡Eso suena como un plan estupendo! ¿Estás emocionado? Me encanta escuchar sobre los planes que tienen las personas.", 
                       "¡Qué interesante! ¿Es algo que haces regularmente o es especial? Me encantaría saber más sobre tus planes.", 
                       "¡Suena genial! Planear cosas nos da algo a lo que mirar con ilusión, ¿no crees? ¿Hay algo en particular que te emocione de ese plan?", 
                       "¡Qué bien! Hacer planes para el futuro siempre es emocionante. ¿Es algo que llevas tiempo queriendo hacer o es una idea reciente?"]
    },
    "comida": {
        "patrones": ["comi", "cene", "desayune", "hamburguesa", "pizza", "restaurante", "cocinar", "cocinando", "comida", "hambre", "comer"],
        "respuestas": ["¡Mmm, hablar de comida siempre me encanta! ¿Te gusta cocinar o prefieres que otros lo hagan por ti?", 
                       "¡La comida, uno de los grandes placeres de la vida! ¿Cuál es tu platillo favorito? Me encanta conocer los gustos culinarios de las personas.", 
                       "¡Qué delicia! La comida tiene ese poder de alegrarnos el día, ¿verdad? ¿Tienes algún restaurante favorito o prefieres la comida casera?", 
                       "¡La comida, tema universal que a todos nos gusta! ¿Eres más de comida tradicional o te gusta experimentar con sabores de todo el mundo?"]
    },
    "entretenimiento": {
        "patrones": ["pelicula", "serie", "tv", "television", "show", "musica", "cancion", "concierto", "videojuego", "juego", "libro", "leer", "teatro"],
        "respuestas": ["¡Ah, el entretenimiento! Una parte esencial de la vida. ¿Qué tipo de contenido disfrutas más? Siempre me interesa conocer los gustos de las personas.", 
                       "¡Qué divertido! El entretenimiento nos ayuda a desconectar y disfrutar. ¿Tienes algún género favorito o recomiendas algo que hayas disfrutado recientemente?", 
                       "¡El mundo del entretenimiento es fascinante! ¿Qué es lo que más disfrutas de eso? ¿Tienes algún artista o creador favorito?", 
                       "El entretenimiento nos transporta a otros mundos, ¿verdad? ¿Hay algo que hayas descubierto recientemente y te haya encantado? ¡Me encantaría saber tus recomendaciones!"]
    },
    "sentimientos_mixtos": {
        "patrones": ["pero", "aunque", "sin embargo", "a pesar", "no obstante"],
        "respuestas": ["Entiendo, parece que tienes sentimientos encontrados sobre eso. La vida rara vez es blanco o negro, ¿verdad? ¿Quieres hablar más sobre lo que te preocupa?", 
                      "Veo que tienes sentimientos mixtos. Es totalmente normal sentirse así a veces. ¿Hay algo específico que te esté causando esa dualidad en tus emociones?",
                      "Las emociones pueden ser complicadas, ¿verdad? A veces sentimos varias cosas a la vez, y está perfectamente bien. ¿Te gustaría contarme más sobre eso?",
                      "Parece que hay varias emociones en juego ahí. La vida suele ser así de compleja. ¿Hay algo en particular de toda esa situación que te esté afectando más?"]
    },
    "despedida": {
        "patrones": ["adios", "hasta luego", "nos vemos", "chao", "bye", "me voy", "tengo que irme", "debo irme", "hasta pronto"],
        "respuestas": ["¡Ha sido un placer charlar contigo! Espero verte pronto por aquí de nuevo. ¡Que tengas un día fantástico!", 
                      "¡Hasta pronto! Me ha encantado nuestra conversación. ¡Vuelve cuando quieras, aquí estaré con la misma energía!", 
                      "¡Cuídate mucho! Ha sido genial poder charlar contigo hoy. ¡Las puertas virtuales siempre estarán abiertas para ti!", 
                      "¡Nos vemos! Espero que el resto de tu día sea increíble. ¡Regresa pronto para seguir charlando!"]
    },
    "agradecimiento": {
        "patrones": ["gracias", "te lo agradezco", "muy amable", "thanks"],
        "respuestas": ["¡No hay de qué! Es un verdadero placer poder ayudarte y conversar contigo. ¿Hay algo más en lo que pueda echarte una mano?", 
                      "¡El placer es todo mío! Me encanta poder ser de ayuda. ¿Necesitas algo más?", 
                      "¡Para eso estamos! Me alegra mucho haber podido ayudarte. ¿Hay alguna otra cosa de la que quieras hablar?", 
                      "¡Es un gusto poder ayudarte! Tu satisfacción es lo que me motiva. ¿Hay algo más en lo que pueda asistirte hoy?"]
    },
    "default": {
        "respuestas": ["¡Interesante! Cuéntame más sobre eso, me encantaría saber los detalles.", 
                      "¡Qué curioso! Me gustaría saber más sobre tu perspectiva en esto. ¿Podrías contarme más?", 
                      "Mmm, creo que necesito entender mejor lo que me estás diciendo. ¿Podrías explicármelo de otra forma? Me interesa mucho conocer tu punto de vista.", 
                      "¡Vaya! Eso da para una buena conversación. ¿Te gustaría profundizar más en el tema?", 
                      "Eso suena interesante. ¿Hay algo específico sobre eso que te gustaría discutir o explorar más a fondo?"]
    }
}

# Palabras para análisis de sentimiento
palabras_positivas = ["bien", "feliz", "contento", "alegre", "genial", "excelente", "fantastico", 
                      "maravilloso", "estupendo", "divertido", "encantado", "satisfecho", "bueno",
                      "positivo", "optimista", "animado", "entusiasmado", "emocionado"]

palabras_negativas = ["mal", "triste", "molesto", "enojado", "terrible", "horrible", "aburrido", 
                      "cansado", "frustrado", "deprimido", "estresado", "preocupado", "ansioso", 
                      "sin animos", "no me siento", "desanimado", "desmotivado", "desilusionado",
                      "exhausto", "agotado", "pesimo", "fatal", "no tengo animos"]