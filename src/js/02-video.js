import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(function (data) {
    const currentTime = data.seconds;
    const currentTimeObj = { currentTime };

    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(currentTimeObj)
    );
  }, 1000)
);

window.addEventListener('load', function () {
  const currentTimeJSON = localStorage.getItem('videoplayer-current-time');
  if (currentTimeJSON) {
    const currentTimeObj = JSON.parse(currentTimeJSON);
    const savedCurrentTime = currentTimeObj.currentTime;
    player
      .setCurrentTime(savedCurrentTime)
      .then(function (seconds) {
        console.log('Playback position restored:', seconds);
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            console.log('Invalid time:', savedCurrentTime);
            break;
          default:
            console.log('Error:', error);
            break;
        }
      });
  }
  localStorage.clear();
});
