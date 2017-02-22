function loadJSON(path, callback) {
  const request = new XMLHttpRequest();
  request.overrideMimeType('application/json');
  request.open('GET', path, true);
  request.onload = () => {
    if (request.status === 200) {
      const json = JSON.parse(request.responseText);
      callback(undefined, json);
    } else {
      const error = `Error ${request.status} loading ${path}`;
      callback(error, undefined);
    }
  };
  request.send(null);
}

export { loadJSON };
