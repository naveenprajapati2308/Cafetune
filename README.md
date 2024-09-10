# Cafetunes


## Description

This project is a web application designed for users to showcase their properties, making them available for others to explore. It encompasses both front-end, back-end, and database components, all organized using the MVC (Model-View-Controller) architecture.

## Table of Contents

1. [Description](#description)
2. [Website](#website)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Database](#database)
8. [Authentication and Authorization](#authentication-and-authorization)
9. [Frontend](#frontend)
10. [Error Handling](#error-handling)
11. [Maps Integration](#maps-integration)
12. [Cloudinary](#cloudinary)

 ## Website


## Features

- User registration and login.
- Creating, editing, and deleting property listings.
- Adding and deleting reviews for listings.
- Ensuring that only the owner of a listing can make changes.
- Providing property details, including title, description, image uploads, pricing, and location.
- Leveraging Mapbox for displaying property locations on maps.
- Implementing comprehensive error handling.
- Crafting an interactive and responsive frontend.
## Tech Stack

- JavaScript
- Node.js
- Express.js
- CSS
- MongoDB (Database)
- Mapbox API (for mapping)
- Cloudinary API (for image storage)

## Installation

1. Clone this repository.

```bash
  git clone https://github.com/Ritvik718/Cafetunes
  .git
```

2. Install project dependencies.
```bash
  npm install
```

3. Set up your MongoDB database.

4. Configure environment variables as needed.

5. Start the server.
```bash
  node app.js
```
## Usage

1. Register or log in to your account.

2. Add property listings with details, including title, description, images, pricing, and location.

3. Edit or delete your listings as needed.

4. Add and delete reviews for property listings.

5. Only the owner of a listing can modify or delete it, ensuring proper authorization.

## Database

For local development and testing, the project is set up to use MongoDB. You don't need to worry about MongoDB Atlas unless you intend to host the project in the cloud. To run the project on your local environment, ensure that MongoDB is properly installed and configured, and you'll only need the local MongoDB connection URL.

## Authentication and Authorization

Authentication and authorization are implemented to protect the integrity of the listings and reviews. Only the owner of a listing can make modifications.


## Frontend

The frontend of this project is designed with a user-friendly interface, focusing on an elegant and intuitive user experience. It features a responsive design to ensure that users can access and interact with the website seamlessly across various devices.
### color combinations:
Mocha and Cream:

Mocha brown: #6F4E37
Creamy beige: #EAE2D7
Accent color (for buttons or highlights): #DAA588

Coffee and Teal:
Coffee brown: #4E3629
Teal blue: #006D68
Accent color: #BFD3C1

Earthy Tones:

Terra cotta: #D56D3B
Olive green: #5F7358
Accent color: #A88C5E
Café Noir:

Espresso black: #2E2E2E
Caramel gold: #DAA588
Accent color: #7F7F7F
Musical Harmony:

Midnight blue: #191970
Goldenrod yellow: #DAA520
Accent color: #8B4513
### Text Colors:
Dark on Light Backgrounds:

Primary Text: #333333
Secondary Text (subtle or for emphasis): #666666
Accent Text (links or highlights): #006D68
Light on Dark Backgrounds:

Primary Text: #EAE2D7
Secondary Text: #BFBFBF
Accent Text: #DAA588
Contrast for Emphasis:

High Contrast Text (for important information): #D56D3B
Neutral Text: #2E2E2E
Accent Text: #8B4513
### Font Families:
Clean and Modern:

Font Family: "Roboto", sans-serif
This font is clean, modern, and easy to read.
Classic and Elegant:

Font Family: "Playfair Display", serif
Playfair Display adds a touch of elegance and is suitable for headings.
Friendly and Inviting:

Font Family: "Quicksand", sans-serif
Quicksand is a friendly, rounded font that can give a welcoming feel.
Stylish and Unique:

Font Family: "Poppins", sans-serif
Poppins is modern, stylish, and offers a bit of uniqueness.
Bold and Eye-catching:

Font Family: "Montserrat", sans-serif
Montserrat is bold and can capture attention, especially for headings.
### Icons
Coffee Cup Icon:
<i class="fa-solid fa-mug-saucer"></i>
Represents the cafe aspect of the project. You can use a simple coffee cup or coffee mug icon.

Musical Note Icon:
<i class="fa-solid fa-music"></i>
<i class="fa-solid fa-guitar"></i>
Symbolizes the music aspect of Cafetunes. Consider using a musical note or a combination of notes.
Microphone Icon:
<i class="fa-solid fa-microphone"></i>
<i class="fa-solid fa-microphone-slash"></i>
Represents live performances. A microphone icon can signify that the cafe hosts live music.
Cafe Building Icon:
<i class="fa-solid fa-champagne-glasses"></i>
An icon resembling a cafe or a building to signify the physical location where the performances take place.
Guitar Icon:

Represents acoustic performances. If your focus includes singer-songwriters, a guitar icon can be fitting.
Audience Icon:
<i class="fa-solid fa-users"></i>
An icon depicting people or a crowd, indicating a social and entertaining atmosphere.
Calendar Icon:

Symbolizes event scheduling. This can indicate that users can check and schedule upcoming performances.
Money/Business Icon:

Represents the business aspect for both cafe owners and local singers. This could be in the form of a dollar sign or a briefcase.
Heart Icon:

Represents the idea of enjoying music or cafes. It can also be used to indicate favorite or recommended performances.
Networking/Connection Icon:

An icon representing the connection between cafe owners and local singers. This could be in the form of linked chains or handshake.


## Error Handling

Comprehensive error handling is implemented to handle various situations, ensuring a smooth user experience.

## Maps Integration

The application integrates Mapbox to display property locations on maps, enhancing the user experience.

## Cloudinary 
The project utilizes Cloudinary for image storage and management. Cloudinary offers a cloud-based solution for uploading, storing, optimizing, and delivering images and videos. It simplifies the process of handling media assets, ensuring fast and reliable image delivery for a seamless user experience.
