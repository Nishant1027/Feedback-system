# Feedback-system



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

.Login for Feedback
![Login for Feedback](https://github.com/Nishant1027/Feedback-system/blob/master/feedback_app/login1.png)


.Home Page
![Home Page](https://github.com/Nishant1027/Feedback-system/blob/master/feedback_app/home1.png)




.Feedback Form which has been attached with oracle database
![Feedback Form which has been attached with oracle database](https://github.com/Nishant1027/Feedback-system/blob/master/feedback_app/feedback1.png)
