# Videogame-plants-vs-zombies.
- Link del sitio web: https://mnoventa.github.io/Videogame-plants-vs-zombies/

Videogame-plants-vs-zombies es un proyecto desarrollado de **forma autodidacta** con la intención de poner en practica mi programación en **Javascript** puro.
He querido desarrollar este videojuego **sin development-helpers**, **sin jQuery** y **sin ningún plugin**.

Mi intención ha sido crear un código **fácil de mantener**, **entendible** y **dinámico**. 

Cuando la página se carga, la función principal setup se encarga de generar todo el html, recuperando el valor de los parametros que se hayan seteado desde un inicio, recogiendo los valores anteriores y generando el mapa, una velocidad de ejecución/generación de los personajes así como su lifetime, etc totalmentmente personalizado.
Cada cierto tiempo (velocity_refresh), se ejecuta la función refresh que se encarga de comprobar las colisiones entre enemigos y aliados/arrows, ejecutar el movimiento de los enemigos y arrows, comprobar el daño recibido para cualquier personaje, prevención de posibles bugs y falsas colisiones, entre otras funcionalidades más.

Tengo intención de ir mejorando el código y añadir nuevas funcionalidades.

# Implementaciones:

Tecnologías y metodologías utilizadas:
- Usando **Vanilla Javascript**.
- **Programación orientada a objectos**.
- HTML5.
- CSS.
