# Linkedin-Crawler

This project automates crawl the Linkedin profile data as plain text using Puppeteer. It also includes a utility to convert cookies exported from browser DevTools into a format compatible with Puppeteer.

## Prerequisites

1. Node.js installed on your system.
2. A valid `cookies.json` file exported from your browser's DevTools.

## Setup

1. Clone the repository and navigate to the project directory.

2. Install dependencies:
   
   ```
   npm install
   ```

3. Create a `.env` file by copying the `.env.example` file:
    
    ```
    cp .env.example .env
    ```

    Update the `.env` file with your specific configuration.

4. Convert your `cookies.json` file into a Puppeteer-compatible format:

    Copy your `cookies.json` to this project.

    ```
    node cookie-converter.js
    ```

    This will generate a `converted-cookies.json` file.

    We need to convert because puppeteer don't understand the default `cookies.json` file.

5. Use node version 18

    ```
    nvm use 18
    ```

---

## Usage

### Crawl Linkedin Profile

Run the script to update story points for tickets in the specified sprint:

```
node linkedin-crawler.js
```

The script will:

1. Open the Linkedin profile page.
2. Use cookie to login.
3. Extract the full text of the page.

---

## Dependencies

The project uses the following dependencies:

- [dotenv](https://www.npmjs.com/package/dotenv): For loading environment variables from the `.env` file.  
- [puppeteer](https://www.npmjs.com/package/puppeteer): For browser automation.
