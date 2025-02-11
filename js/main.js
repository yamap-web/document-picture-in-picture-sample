const pipBtn = document.getElementById('pip-btn');

pipBtn.addEventListener('click', async () => {
  if (!('documentPictureInPicture' in window)) {
    alert('ピクチャーインピクチャーはサポートされていません');
    return;
  }

  const pipContent = document.getElementById('pip-content');
  const pipWindow = await window.documentPictureInPicture.requestWindow({
    width: pipContent.clientWidth,
    height: pipContent.clientHeight,
  });

  const pipBackground = window.getComputedStyle(pipContent).backgroundColor;
  pipWindow.document.body.style.backgroundColor = pipBackground;

  pipWindow.document.body.append(pipContent);

  pipWindow.addEventListener('unload', (e) => {
    const pipContainer = document.getElementById('pip-container');
    const content = e.target.getElementById('pip-content');
    pipContainer.append(content);
  });
});
