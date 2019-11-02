export function fetchNewsService(sourceUrl: string) {
  return new Promise((resolve, reject) => {
    fetch(sourceUrl)
      .then(res => {
        return res.json();
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}