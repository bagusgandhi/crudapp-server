
# CrudApp Server
This is the Crud App on Backend Development. You can see the setup and installation bellow.
For the Frontend Development, you can see on this [link](https://github.com/bagusgandhi/crudapp-client)

API Docs [https://documenter.getpostman.com/view/7162317/2s8YCgDCFH](https://documenter.getpostman.com/view/7162317/2s8YCgDCFH)

## Setup & Installation

Clone this Repository to your local-machine or server.

```sh
git clone https://github.com/bagusgandhi/crudapp-server.git
```
Then *cd* into it.
```sh
cd crudapp-server
```
install the package with npm or yarn.

```sh
npm install
// or
yarn
```
For the database on this project is using mongodb atlas, you can create database on this [Documentation](https://www.mongodb.com/docs/atlas/getting-started/)

After Database create, then create a **.env** file on the root project, then add environtment variable like this
```sh
MONGO_URI=mongodb+srv://username:<PASSWORD>@yourclusterurl/dbname?retryWrites=true&w=majority
MONGO_PASSWORD=yourMongoPasswordAccess
JWT_SECRET=yourJWTSecret
JWT_EXPIRES_IN=7d
NODE_ENV=development || production // choose for development or production
```


## Running
If you want to running in development, you can install *nodemon* 

    npm i -D nodemon

Then run the project with

    npm run dev
    // or
    yarn dev

For running on production you can install pm2

    npm i pm2
    // or
    yarn add pm2

The run the project with

    npm run production
    // or
    yarn production
