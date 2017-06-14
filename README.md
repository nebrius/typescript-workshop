# TypeScript in Practice

A real-world workshop for [TypeScript](typescriptlang.com) in the server and browser at [Dinosaur JS](https://dinosaurjs.org/).

In this workshop, we will create a meme collector app using the [Giphy API](https://github.com/Giphy/GiphyAPI). The app will consist of a server component, written using [Express.js](expressjs.com), and a client component, written using [React.js](https://facebook.github.io/react). There are three stages to the app. The first two stages will be directed, meaning we will go through everything step by step as a group. The third stage will be self-directed, much like how [NodeSchool](https://nodeschool.io/) events work if you have attended one of those before.

## Installation Instructions

Before we begin the workshop, please make sure you have completed the following steps:

- Install Node.js version 6 or newer from https://nodejs.org
- Install Visual Studio Code from https://code.visualstudio.com
- Create the following folder structure:
    - Project Root, e.g. `~/Projects/TypeScript-Workshop`
        - client
        - common
        - server

## Stage 1

For stage 1, we are going to build a Hello World app that combines the client and server. Specifically:

- Create a build infrastructure for the server using the TypeScript compiler and [TSLint](https://github.com/palantir/tslint)
- Create a build infrastructure for the client using [Webpack](https://webpack.github.io/), the TypeScript compiler, and TSLint.
- Configure the build infrastructure and Visual Studio Code to be able to debug the server-side code
- Configure the build infrastructure to be able to debug the client-side code using the Chrome developer tools
- Create a bare-bones Express server that can server static files
- Create a basic React hello world app that is served from our Express server

## Stage 2

For stage 2, we are going to add the ability to create and view meme lists. Specifically:

- Create a new npm module in the `common` folder for shared interfaces between the client and server
    - Configure the module to be built similarly to the server
    - Configure TypeScript to generate type definition files that are exposed to module consumers so the client and server can consume the types
- Update the server so that user's can get the list of memes, and can create new memes.
    - Each meme will consist of a Title and a URL to the meme on Giphy
    - Store the memes in an SQLite database. For this workshop, create the database in memory
- Update the client so that user's can create new mems and view their existing ones
    - The page should consist of a Title, an "Add New" button, and the memes shown in a grid format
    - When the user clicks on the "Add New" button, a dialog should pop up where user's can enter a Title and Giphy search phrase
    - The client will call the Giphy API and get the URL for the first returned result
    - The client will call the server to store the new API, and then again to get the updated list and update the UI

## Stage 3

_Note:_ This stage is a go-at-your-own pace stage. I will be available to help answer questions, but will not be leading attendees through step by step.

For stage 3, we are going to add more functionality to the app. Specifically:

- Refactor the server:
    - Create a module responsible for interacting with SQLite
    - This module should consist of a class with two methods: `getAllMemes` and `saveMeme`.
    - Add caching to `getAllMemes` using a private property on the class so that it only queries SQLite on startup and when `saveMeme` is called.
- Add new functionality to the client:
    - Now, instead of only selecting the first result from a search query, display all of the search results and let the user pick
    - To suppor the above, create a common `GridView` component that is used by the meme list in `ContainerView` and by the search results in this new view.
