import throttle from 'lodash.throttle';


const STORAGE_TIME = 'videoplayer-current-time';
var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);

player.on('play', function () {
    console.log('played the video!');
});

player.on('timeupdate', throttle(onUpdate, 1000));
function onUpdate(e) {
    localStorage.setItem(STORAGE_TIME, e.seconds);
};

player.setCurrentTime(localStorage.getItem(STORAGE_TIME)).then(function (seconds) {
    seconds = localStorage.getItem(STORAGE_TIME);
}).catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;
        
        default:
            //some other error occurred
            break;
    }
});
