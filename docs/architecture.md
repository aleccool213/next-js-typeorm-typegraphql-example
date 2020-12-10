# Architecture

## Philosophy

I wanted to make this application as easy to spin up as possible. That way I can worry more about writing more features and less about maintenance and tooling. For that reason I went with making it compatible with serverless function hosting services like Netlify and Vercel. Another goal I had was to use as many familar tools as possible so it would be easy to contribute to. For this reason I chose Node.js for the backend and Next.js for the frontend. Next.js provides a consistent framework for building React apps. I chose to use GraphQL to increase adoption, I see people creating custom CalSync widgets to be embedded in websites.

## Tech Stack

* Next.js for React frontend
* Apollo Server for GraphQL API
* MongoDB for data persistance
  * Recommended Provider: MongoDB Atlas
* Emails for notifications:
  * Recommend Provider: Sendgrid
