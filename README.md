# Feedback-system

I'm aware I'm commiting the db user,pass and connection string. This is not a production application and for this instance it does not matter, but typically, this would be a very very bad thing to do.

SETUP

Here's how to setup this project:

.First, fork this repository.

.Clone the repository you have forked.

.ENSURE that you have node installed (v10.15.3). If you do not, you can install the latest version from https://nodejs.org/en/download/

.ENSURE that oracleserviceORCL is running.

.Create DB user in oracle through SQLPlus prompt, ENSURE that the name and key matches with the values given in ./config/database.js

.Set up the DB using table.sql (through SQLPlus).

.Run npm install command.

.Run the command node index.js from the root of this project.


Ideally, you should obtain output as follows:

PS C:\Dev\node\feedback_app> node index.js

.Starting application

.Initializing database module

.Initializing web server module

.Web server listening on localhost:3000
![Login for Feedback](https://drive.google.com/open?id=1sQJlSeWVn1GGp6Qhjjrm8MC-QNLCBZY_)

![Home Page](https://drive.google.com/open?id=1JY6UxZold0ttfD1N8pE01qvAfLkz5T6S)



![Feedback Form which has been attached with oracle database](https://drive.google.com/open?id=1oZ30B86SMEP9B_96f8Izo3eUmeV_QcPF)
