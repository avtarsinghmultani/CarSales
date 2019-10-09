# CarSales
CarSales Website with Show Cars and Add Cars Funtionality.
This app is a template application using ASP.NET Core 3.0 for a REST/JSON API server and React/Redux for a web client.
### Note: Please change connection string named ```appDbConnection``` in ```appsettings.json``` file to your database connection string.

## Overview of Stack
- Server
  - ASP.NET Core 3.0
  - Entity Framework Core w/ EF Migrations
  - REST based API
  - LocalDB for data storage
- Client
  - React 16
  - CSS Modules
  - Fetch API for REST requests
- Testing
  - Jest for React
  
## Setup
### Build and run your code in Visual Studio
1. To build your project, choose Build Solution from the Build menu. The Output window shows the results of the build process.
2. To run the code, on the menu bar, choose Debug, Start without debugging.
3. Open browser and navigate to https://localhost:44338.

This template was developed and tested on Windows 

## Scripts
### ``` npm install ```
When first cloning the repo or adding new dependencies, run this command. This will:
- Install Node dependencies from package.json
- Install .NET Core dependencies from CarSales.csproj (using dotnet restore)
### ``` npm start ```
To start the app for development, run this command. This will:
- Run dotnet watch run which will build the app (if changed), watch for changes and start the web server on https://localhost:44338

### Home Page
![alt text](https://raw.githubusercontent.com/rmit-s3530196-avtar-singh/CarSales/master/CarSales/ClientApp/src/css/homepage.png)


### Navbar Menu
![alt text](https://raw.githubusercontent.com/rmit-s3530196-avtar-singh/CarSales/master/CarSales/ClientApp/src/css/add_car_menu.png)


### Add Car Page
![alt text](https://raw.githubusercontent.com/rmit-s3530196-avtar-singh/CarSales/master/CarSales/ClientApp/src/css/add_car.png)


### Confirmation Dialog.
![alt text](https://raw.githubusercontent.com/rmit-s3530196-avtar-singh/CarSales/master/CarSales/ClientApp/src/css/add_car_confirm.png)


### List of Cars
![alt text](https://raw.githubusercontent.com/rmit-s3530196-avtar-singh/CarSales/master/CarSales/ClientApp/src/css/cars_page.png)
