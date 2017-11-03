# Commune

By ...

## Environments

- Both development servers are required to run Commune
- `npm run dev:server` to run on localhost:3000
- In a separate terminal tab, `npm run dev:server` to run on localhost:3001

## Features

1. To be added

## Captures

![Alt text](https://github.com/TuanPham303/Commune/blob/master/public/github-images/Screen%20Shot%202017-11-03%20at%2011.04.48%20AM.png?raw=true)
![Alt text](https://github.com/TuanPham303/Commune/blob/master/public/github-images/Screen%20Shot%202017-11-03%20at%2011.06.33%20AM.png?raw=true)
![Alt text](https://github.com/TuanPham303/Commune/blob/master/public/github-images/Screen%20Shot%202017-11-03%20at%2011.11.25%20AM.png?raw=true)

## Starting Up Commune

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

7. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
8. Update the .env file with your correct local information
9. Install dependencies: `npm i`
10. Fix to binaries for sass: `npm rebuild node-sass`
11. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
12. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
13. Run the server: `npm run local`
14. Visit `http://localhost:3000/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
