# zest-techinical-challenge
Este es el repositorio de mi solución para el desafío técnico para Zest. En este desarrolló una aplicación móvil en React Native usando Expo, para buscar las cervecerías del mundo guardadas en una base de datos provista por Zest. 
La búsqueda se puede filtrar por nombre y por ciudad y además se puede extender el campo del filtrado en sencillos pasos. También cuenta con una página dedicada a mostrar la información de la Cervecería, saber si el usuario la tiene guardado en favoritos y añadir o eliminar la cervecería de esta categoría. Por último tendrá una parte dedicada para poder ver las cervecerías guardadas en favoritos.

# Instalación

La aplicación puede ser instalada simplemente ejecutando npm install y podrá ser ejecutada con el comando npm run start.

Además cuenta con comandos para pasar eslint al proyecto con npm run lint y se podrán correr los test suites con el comando npm run jest o si se desea un archivo de test individual con el comando npm run jest – <nombre del archivo>

# Detalles de la implementación

Diseño: La aplicación se diseñó para que sea fácil añadir nuevas páginas de búsqueda(implementadas con Tabs) y opciones del filtrado de búsqueda.
Además se tuvo en cuenta que las api externas como Fetch o Asyn Storage cumplan una mínima interfaz para que pueda ser inyectada como dependencia en cualquiera de las páginas de búsqueda.

Stilo: Para el estilo use una paleta de colores que siga una temática alemana(use los colores de la bandera alemana). No hice uso de assets estáticos como fuentes o imágenes y utilice librería de vector-items de Expo para los iconos de la aplicación.

El estilo fue implementado con la librería NativeWind, ya que se puede ver que hay componentes de estilo que implementa esta librería. También hay algunos componentes que necesite darles estilo de forma manual, estos estilos están definidos en el archivo themes.js.

Test: Hay un conjunto minimal de test que solamente prueban cuestiones funcionales de algunos componentes. Sin duda alguna no son test suites completos y hay algunas funcionalidades que no están testeadas. Por ejemplo los componentes de Home y Favorites no tienen test suites ya que solamente renderizan el componente Page pasándole una función para aplicar filtro insertado a las cervecerías.

Estructura De Archivos: en la raíz del proyecto se encuentran todos los archivos de configuración, el componente de entrada App.Jsx, y el archivo themes.js con los temas de la aplicación y objetos de estilo.
Luego estará la carpeta src que tendrá el resto de archivos del proyecto, dentro de él se encuentran los directorios:

Screens: donde estarán los componentes que terminará siendo pantallas en la aplicación
Services: que tendrá los archivos que implementaran las funcionalidades que se necesitan de las distintas API, y una archivo utils.js con algunas utilidades usadas en el proyecto.

__test__: que tendrán los archivos con los distintos test suites
