/**
* @author Greg
* A bunch of functions to work with Google Drive File System
**/

/**
* Copies a file to a specified folder
* @param  File   file   - the file to move
* @param  Folder folder - the folder where the file will be copied
* @return File          - the file that has just been copied
**/
function moveFileToFolder(file) {
  return function (folder) {
    const parents = copyIteratorToArray(file.getParents())
    folder.addFile(file)
    return parents.reduce(function(file, parent){
      parent.removeFile(file)
      return file
    },file)
  }
}


/**
* Gets the first file with the corresponing name from the specified folder
* @param  String fileName   - the name of the file we would like to get
* @param  Folder folder     - the folder where the file will be copied
* @return File              - the file that has just been found or false if no file is found
**/
function getFileFromFolder(fileName) {
  return function (folder) {
    // We get all the files in folder with given fileName 
    const files = copyIteratorToArray(folder.getFilesByName(fileName))
    // If there is more than one file matching fileName, we return it
    // TODO: IMPROVE THAT
    return files.length >= 1 ? files[0] : false
  }
}

/**
* Gets the first folder with the corresponing name from the parent folder
* If the folder doesn't exists, the folder will be created and returned
* @param  String folderName - the name of the folder we would like to get
* @param  Folder folder     - the name folder we want to get a folder from
* @return Folder            - the folder that has just been found or a new one if no folder is found
**/
function getFolderFromFolder(folderName) {
  return function (folder) {
    // We get all the folders that match folderName from the folder
    const folders = copyIteratorToArray(folder.getFoldersByName(folderName))
    // If there is a folder in folders
    return folders.length >= 1 
    // Then we return the folder
    ? folders[0] 
    // Else, we return a new folder called 'folderName'
    : folder.createFolder(folderName)  
  }
}

/**
* Copies an iterator to an array.
* Usefull for functionnal programming with FileIterators and other Drive Iterators
* @param  Iterator  - The iterator you want to copy
* @return Array     - an array copying the iterator
**/
function copyIteratorToArray(iterator) {
  var result = []
  while (iterator.hasNext()) {
    result.push(iterator.next())
  }
  return result
}

/**
* Securly opens a Google Spreadsheet by its URL.
* return the spreadsheet or false if not present.
* @param String url    - the url you want to open
* @return spreadsheet  - returns the spreadsheet or false
**/
function openSpreadsheetByUrl (url) {
  try {
    return SpreadsheetApp.openByUrl(url)
  }
  catch(error){
    console.error(error)
    return null
  }
}

