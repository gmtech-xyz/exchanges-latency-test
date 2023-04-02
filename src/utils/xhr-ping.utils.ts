function request(url: string, onload: () => void) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = onload;
  xhr.send();
}

export const pingURL = (url: string): Promise<number> => {
  return new Promise((resolve) => {
    const start = performance.now();
    request(url, () => {
      const delay = Math.round(performance.now() - start);
      resolve(delay);
    });
  });
};
