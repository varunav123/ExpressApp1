# ExpressApp1
To use this server, run this on Visual Studio 2022 with Node.js installed on windows. 
http://localhost:3000/ is the link for the server.
In order to see the database, visit http://localhost:3000/read?index=0. index =0,1,2,.. goes on till the i-1th submission(i.e only shows data for 0 if 1 submission)
The server is local. The data on submission is stored here in JSON format.
The JSON structure is as follows-
Each JSON object represents 1 form, and each label in the form along with it's data (Name- John Doe, Email-johndoe@gmail.com etc) makes up a key-value pair
There are 5 key-value pairs and the view and edit submission in the front end has been designed to show these 5. The view is dynamic, and can show any 5 labels.
The submit option is static and the labels are fixed.
Although the data is being stored, there is some issue in viewing the stored submissions. I couldn't exactly figure it out hence it doesn't work as intended.
The frontend can still read any JSON file given to it and view the submissions and cycle through them given the JSON file follows the structure I mentioned.
