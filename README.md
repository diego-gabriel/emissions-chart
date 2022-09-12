## Installing the Frontend

To run the frontend, we first need to:
1. Install the dependencies with `yarn install`
2. Build the bundle with `yarn build:frontend`. You can also run `yarn build` to watch for changes on the filesystem and rebuild automatically
3. Install `serve` with `npm install --global serve`. This is a server that will help us to serve the static `index.html` 

## Installing the Backend

The backend was developed with Python 3.10, it might not work with lower versions.
To install the dependencies, simply run `yarn install:backend`.

## Running the project

Once the web bundle is built and all dependencies installed, use `serve` to run the frontend 
and `uvicorn backend:app` to run the backend.

Yay! The project is now accessible from `http://localhost:3000/frontend/src/`
