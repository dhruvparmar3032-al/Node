const { error } = require("node:console");
const fs = require("node:fs");

//fs = file system

//create a file
//fs.appendFile(path, data, callback fnc)

// fs.appendFile('hello.txt' , "Hello World !!", (err) => {
//     if(err) throw error;

//     console.log("File created successfully");
// });

//fs.writeFile(path, data, callback fnc)

// fs.writeFile('hello.txt' , "Hello World !!", (err) => {
//     if(err) throw error;

//     console.log("File created successfully");
// });

//issue: when you change hello.txt file and after that you the file that cmd will be replace  whole file with above given data 

//create a folder
//fs.mkdir(path, callback fnc)
// fs.mkdir("pages", (err) => {
//     if(err) throw error;

//     console.log("Folder created successfully");
// });



//create a nested folder
//fs.mkdir(path,{options}, callback fnc)
// fs.mkdir("CSS/Home/Style",{ recursive: true }, (e) =>{
//     if(e) throw error;

//     console.log("nested Folder created successfully");

// })

//========================================================================


//read a file
//fs.readFile(path, fnc(e,data){})

// fs.readFile( "hello.txt", "utf-8", (e, data) => {
//     if(e) throw error;
//     console.log(data);

// });
//as a response you get data (files inputes)

//read a folder
//fs.readdir(path, fnc(e,files){})

// fs.readdir("CSS/Home/Style", (e, files) => {
//     if(e) throw error;
//     console.log(files);

// });

//as a response you get a array of folder and files name

///==================================================

//copy a file
//fs.copyFile("path with file name", "path with file name", callback fnc)

// fs.copyFile("hello.txt", "CSS/Home/Style/copy.txt" , (e) => {
//     if(e) throw error;
//     console.log("File copied successfully");
// });  

    

//==================================================

//rename a file
//fs.rename('old(existing) file name with path', 'new file name with path', callback fnc)
// fs.rename('hello.txt', 'name.txt', (e) => {
//     if(e) throw error;
//     console.log("File renamed successfully");
// });


//nest file rename and move
// fs.rename('name.txt', 'CSS/Home/Style/name.txt', (e) => {
//     if(e) throw error;
//     console.log("File renamed and moved successfully");
// });


//=======================================================

//delete a file
// fs.rm(file name with path, callback fnc)

// fs.rm('CSS/Home/Style/name.txt', (e) => {
//     if(e) throw error;
//     console.log("File deleted successfully");
// });


//dekete a folder
// fs.rm('pages', { recursive: true, force: true }, (e) => {
//     if(e) throw error;
//     console.log("Folder deleted successfully");
// });


fs.rm('index.js', (e) => {
    if(e) throw error;
    console.log("File deleted successfully");
});
