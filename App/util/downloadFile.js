// from http://stackoverflow.com/questions/283956/
const saveAs = (URI, filename) => {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = URI;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(URI);
    }
};

export const downloadFile = (fileData) => {
    const blob = new Blob([fileData.contents], {type: fileData.mime});
    const url = URL.createObjectURL(blob);
    saveAs(url, fileData.filename);
};
