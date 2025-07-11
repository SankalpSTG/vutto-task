# Vutto Task

This repository is a task given by Vutto. 

### Note

I have built this repository in less than a day and hence I have skipped some basic things for e.g. creating reusable components for each and every cards item in frontend, just to meet the deadline.

## What's Covered
### API
1. Auth
    1. Login
    2. Sign Up
    3. Is Logged In
    4. Logout
2. Bike Ads
    1. Create Bike Ad
    2. Edit Bike Ad
    3. List Bike Ads
    4. List User Bike Ads
    5. Get Bike Ad Details
    6. Update Bike Ad
    7. Delete Bike Ad
    8. Create S3 Image Upload URL for Bike Ad

### Pages
1. Login
2. Sign Up
3. All Bike Ads List
4. Bike Ad Details
5. User Bike Ad List
6. Create Bike Ad
7. Edit Bike Ad


### Tech Stack
1. Database - MongoDB with Mongoose
2. Backend - Node.js, Express, Typescript
3. Frontend - Vite React, React Router, Tailwindcss, Zustand

## Project Architecture
### Backend
Backend is broken into Modules, such as auth, bike-ad, etc, with an idea that each can be broken into a separate microservice, inspired by Nest.js

Each module has it's own router, service, controller. Services have the logic and services can depend on external services. 

There are some shared modules like AWS which only provides services to others. We can use better design patterns and create an abstract factory to write cloud platforms code in plug-and-play fashion. However due to time constraints, I avoided this.

Database Schemas are shared by modules for joins, to avoid complexity. However modules own database collections and foreign services talk to a collection through it's service.

I have used Zod for input validation. The types derived from zod are used as DTOs in modules. I have implemented a middleware which parses both query params and body using zod and returns exception in case of invalid data.

Authorization happens through Authorization middleware. There is a global exception handler middleware which catches exceptions and sends responses accordingly.

The app uses Cookies for authentication.
### Frontend
The project is divided into following folders
1. Layouts
2. Containers
3. Components

Layouts are commonly shared by containers of same group. Layouts can also house sub routes although we haven't done that in this case. Layouts do now have core logic of application.

Containers are actual pages and logic exists here.

Components are granular reusable JSX elements.

API calls are usually done in zustand stores except for two cases, creating presigned urls and logout. 

I have avoided creating a single store like Redux pattern to make it easy to migrate to Next.js in future. State is instead broken into small stores for each piece of logic.

Stores are created based on data. An API call or form data is treated as a piece of logic for which an entire store is dedicated, except for cases where data is shared.

New Bike and Edit Bike have same data and hence use one single reducer. While "Bike Ads" and "User Bike Ads" also share same data, their states are different and may be merged in the future.

## How to run

The project is built using 
1. node v22.16, 
2. pnpm v10.11.1, 

Using the above version will ensure no compilation errors.

There is a ``.env.example`` file present in both the frontend and backend folder. Copy the env variables to ``.env`` and paste them with values for each key.

Install the dependencies with ``pnpm i``

Run ``pnpm dev`` that's it!