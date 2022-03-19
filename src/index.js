const { ipcRenderer } = require('electron');
const $pills = document.querySelector('.pills');

const $inputFiles = document.querySelector('#files');
$inputFiles.addEventListener('change', e => {
  e.preventDefault();
  const files = e.target.files;
  const paths = [];
  for (let file of files) {
    paths.push(file.path);
  }

  ipcRenderer.send('process-subtitles', paths);
  ipcRenderer.on('process-subtitles', (event, args) => {
    const words = args.reduce((acc, word) => {
      acc += `
        <div class="pill">
          <span class="word">${word.name}</span>
          <span class="amount">${word.amount}</span>
        </div> 
      `;

      return acc;
    }, '');

    $pills.innerHTML = words;
  });
});
