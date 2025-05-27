# Proyecto DARC: Descubre, Aprende Regiones de Colombia

## Descripción General

**DARC (Descubre, Aprende Regiones de Colombia)** es una plataforma web educativa diseñada para transformar el aprendizaje sobre las regiones de Colombia en una experiencia lúdica e interactiva para estudiantes de primaria (7-12 años). A través de juegos didácticos, mapas interactivos y actividades que fomentan el aprendizaje autónomo y la colaboración, DARC busca que los niños aprendan sobre la geografía, cultura, historia y biodiversidad de su país. La plataforma permitirá conectar imágenes, audios y videos, arrastrándolos a diferentes regiones de Colombia, ofreciendo un valioso recurso académico y didáctico también para docentes.

Este repositorio (`paul_darc`) contiene el desarrollo y la documentación del proyecto DARC.

## Tabla de Contenidos

1.  [Descripción General](#descripción-general)
2.  [Objetivos del Proyecto](#objetivos-del-proyecto)
3.  [Características Principales](#características-principales)
4.  [Público Objetivo](#público-objetivo)
5.  [Roles de Usuario](#roles-de-usuario)
6.  [Tecnologías Propuestas](#tecnologías-propuestas)
7.  [Estructura del Proyecto](#estructura-del-proyecto)
8.  [Estado del Proyecto](#estado-del-proyecto)
9.  [Cómo Contribuir](#cómo-contribuir)
10. [Autores y Equipo](#autores-y-equipo)
11. [Licencia](#licencia)

## Objetivos del Proyecto

*   **Educativo:** Facilitar el aprendizaje sobre las regiones de Colombia de forma divertida e interactiva.
*   **Motivador:** Despertar el interés de los niños por la geografía, cultura e historia de su país.
*   **Accesible:** Estar disponible para cualquier estudiante con acceso a internet.
*   **Fácil de usar:** Contar con una interfaz intuitiva y amigable para niños.
*   **Recurso didáctico:** Proporcionar herramientas y materiales de apoyo para docentes.

## Características Principales

*   **Gestión de Perfiles de Usuario:**
    *   Registro de usuarios.
    *   Almacenamiento de progreso, puntajes, logros y estadísticas.
*   **Mapa Interactivo de Colombia:**
    *   Renderizado del mapa dividido por regiones.
    *   Funciones de zoom (in/out) y restablecimiento.
    *   Desplazamiento (panning) en el mapa.
    *   Resaltado visual de la región seleccionada.
*   **Información Detallada por Región:**
    *   Acceso a datos sobre ubicación geográfica, cultura, tradiciones, historia y biodiversidad.
    *   Visualización de imágenes, reproducción de audios y videos de cada región.
*   **Juegos Didácticos Interactivos:**
    *   Juegos con barras de progreso, sistema de puntos y recompensas (logros).
    *   Actividades interactivas de arrastrar y soltar elementos en el mapa.
    *   Validación de respuestas y retroalimentación visual y sonora.
*   **Monitoreo y Reportes (para administradores):**
    *   Monitoreo del progreso y actividad de los usuarios.
    *   Generación de reportes y estadísticas sobre el uso de la plataforma.
    *   Gestión de usuarios, contenido (regiones, información, multimedia) y juegos.

## Público Objetivo

*   Estudiantes de primaria (7-12 años).
*   Docentes que buscan recursos didácticos complementarios.

## Roles de Usuario

El sistema contempla los siguientes roles principales:

*   **Alumno:** Puede registrarse, interactuar con el mapa, jugar, ver su progreso y obtener recompensas.
*   **Docente Investigador / Docente Invitado:** Roles con capacidades específicas para la gestión y uso de la plataforma en un contexto educativo (detalles según documento).
*   **Administrador:** Gestión completa de usuarios, contenidos, juegos y reportes.
*   **Invitado (No registrado):** Acceso limitado a ciertas funcionalidades como explorar el mapa y algunos juegos básicos.

## Tecnologías Propuestas

El diseño del proyecto considera el uso de tecnologías modernas para el desarrollo web:

*   **Frontend:** HTML, CSS, JavaScript (posiblemente con un framework como React, Angular o Vue.js para una SPA).
*   **Backend:** Un lenguaje de programación para el servidor (Ej: Node.js, Python, Java, PHP) para construir una API RESTful.
*   **Base de Datos:** Se evaluarán opciones SQL (como PostgreSQL, MySQL) y NoSQL, con un diseño Entidad-Relación ya propuesto.
*   **Autenticación:** Posiblemente mediante JWT (JSON Web Tokens).
*   **Otros:** Principios de diseño MVC (Modelo-Vista-Controlador), ORM (Mapeo Objeto-Relacional).


## Estado del Proyecto

Actualmente, el proyecto se encuentra en la **fase de diseño y planificación**, tal como se detalla en el "Documento de Propuesta de Diseño de Software I, II y III". Las siguientes etapas incluirán:

1.  **Etapa 2: Persistencia de Datos con Backend:**
    *   Diseño de la Arquitectura de Backend.
    *   Elección e implementación de la Base de Datos.
    *   Desarrollo de la lógica de negocio y Endpoints/APIs.
    *   Autenticación y Autorización.
    *   Pruebas del Backend.
2.  **Etapa 3: Consumo de Datos y Desarrollo Frontend:**
    *   Creación de la Interfaz de Usuario (UI) con HTML, CSS y JavaScript.
    *   Desarrollo de la lógica del Frontend y manejo de eventos.
    *   Consumo de datos desde el Backend (API).
    *   Implementación de funcionalidades interactivas.
    *   Pruebas y depuración del Frontend.

## Cómo Contribuir

Por el momento, el proyecto está en una fase inicial de diseño por el equipo principal. Se actualizará esta sección si se abren oportunidades para contribuciones externas.

Si eres parte del equipo:

1.  Clona el repositorio: `git clone https://github.com/Grupo-Investigacion-Bimadino/paul_darc.git`
2.  Crea una nueva rama para tus cambios: `git checkout -b feature/nombre-de-tu-funcionalidad`
3.  Realiza tus cambios y haz commit: `git commit -m "Añade nueva funcionalidad X"`
4.  Sube tus cambios a la rama: `git push origin feature/nombre-de-tu-funcionalidad`
5.  Abre un Pull Request para revisión.

## Autores y Equipo

*   **Tutor:** Alexander Enrique Toscano Ricardo

*   **Estudiantes:**
    *   Marlon Yesid Cobos Villalobos
    *   Nair José Madera Tardecilla
    *   Felipe Miguel Patrón De La Ossa
    *   Cristian Javier Castaño Martínez

## Licencia

Este proyecto se distribuye bajo la licencia [NOMBRE DE LA LICENCIA (ej: MIT, GPLv3)]. (Por favor, elige y especifica una licencia).
Si no tienes una, MIT es una opción popular y permisiva:
`Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE.md para más detalles.`

---

*Este README se ha generado basándose en el "Documento de Propuesta de Diseño de Software I, II y III". Se actualizará a medida que el proyecto avance.*

