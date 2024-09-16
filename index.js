/* ----------------------------- THE-ONLOAD ----------------------------- */

window.addEventListener('load', function() {
    openHelp()
});



/* ----------------------------- INFO-POPUP ----------------------------- */

function openHelp(){
    document.getElementById('creditInfo').style.display = 'flex'
    document.body.style.overflow = "hidden"
}

function closeHelp(){
    document.getElementById('creditInfo').style.display = 'none'
    document.body.style.overflow = ""
}



/* ------------------------------ CONNECTING-GITHUB ------------------------------ */

GitHubCalendar(".calendar", "praashoo7", { responsive: true });



/* ------------------------------ PROJECT-OPEN-CLOSE ------------------------------ */

let applyBgColor = "#53FFB0";

const colorMap = {
    red: "#FF1212",
    white: "#ECECEC",
    green: "#53FFB0",
    purple: "#FF9AFF"
};

const buttonStates = {};

function updateButtonStyles() {
    Object.keys(buttonStates).forEach(ID => {
        const button = document.getElementById(ID);
        const contentDiv = document.getElementById(ID + "Open");
        if (buttonStates[ID]) {
            button.style.backgroundColor = applyBgColor;
            button.style.color = "black";
        } else {
            button.style.backgroundColor = "transparent";
            button.style.color = applyBgColor;
        }
    });
}

function openData(ID) {
    if (buttonStates[ID] === undefined) {
        buttonStates[ID] = false;

        const button = document.getElementById(ID);
        button.addEventListener('mouseenter', () => {
            if (!buttonStates[ID]) {
                button.style.backgroundColor = applyBgColor;
                button.style.color = "black";
            }
        });
        button.addEventListener('mouseleave', () => {
            if (!buttonStates[ID]) {
                button.style.backgroundColor = "transparent";
                button.style.color = applyBgColor;
            }
        });
    }

    buttonStates[ID] = !buttonStates[ID];

    const button = document.getElementById(ID);
    const contentDiv = document.getElementById(ID + "Open");

    if (buttonStates[ID]) {
        contentDiv.style.display = "flex";
        button.style.backgroundColor = applyBgColor;
        button.style.color = "black";
    } else {
        contentDiv.style.display = "none";
        button.style.backgroundColor = "transparent";
        button.style.color = applyBgColor;
    }
}



/* -------------------------------- THEME-CHANGE -------------------------------- */

function themeChange(ID) {
    const color = colorMap[ID];
    document.documentElement.setAttribute('data-theme', ID);
    localStorage.setItem('theme', ID);
    applyBgColor = color;  // Update the global color variable

    Object.keys(colorMap).forEach(key => {
        const btn = document.getElementById(key);
        if (key === ID) {
            btn.style.backgroundColor = color;
            document.getElementById('pfpImageSRC').src = "imgs/pfpImages/" + ID + ".webp"
            document.getElementById('windowIcon').href = "imgs/pfpImages/pfpImagesR/" + ID + ".webp"
            btn.style.color = "black";
        } else {
            btn.style.backgroundColor = "transparent";
            btn.style.color = color;
        }
    });

    updateButtonStyles();
}

const savedTheme = localStorage.getItem('theme') || 'green';
themeChange(savedTheme);



/* ---------------------------------- MAIL-TO ---------------------------------- */

function mailDefault(){
    var email = "meprashant00@gmail.com";
    window.open(`mailto:${email}`);
}



/* ----------------------------- SMALL-DEVICE ----------------------------- */

window.addEventListener('resize', function(){
    if(window.innerWidth < 281){
        document.querySelector('.main').style.display = 'none'
        document.querySelector('.footer').style.display = 'none'
        document.querySelector('.creditInfo').style.display = 'none'
    } else {
        document.querySelector('.main').style.display = 'flex'
        document.querySelector('.footer').style.display = 'flex'
        document.querySelector('.creditInfo').style.display = 'flex'
    }
})



// /* ------------------------------ CONNECTING-SPOTIFY ------------------------------ */

// const clientId = '';
// const clientSecret = ''; // This should be handled server-side in a real application
// const redirectUri = 'http://127.0.0.1:5501/';
// const scope = 'user-read-currently-playing user-read-playback-state';

// function debugLog(message) {
//     // console.log(message);
//     // document.getElementById('debug-info').innerHTML += `<p>${message}</p>`;
// }

// let accessToken = localStorage.getItem('spotify_access_token');
// let tokenExpirationTime = localStorage.getItem('spotify_token_expiration');

// if (accessToken && tokenExpirationTime && new Date().getTime() < tokenExpirationTime) {
//     getCurrentlyPlaying(accessToken);
// } else {
//     const args = new URLSearchParams(window.location.search);
//     const code = args.get('code');

//     if (code) {
//         exchangeToken(code);
//     } else {
//         // debugLog('No code found, starting auth process');
//         const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
//         // debugLog(`Redirecting to: ${authUrl}`);
//         window.location.href = authUrl;
//     }
// }

// function exchangeToken(code) {
//     // debugLog('Exchanging token');
//     const tokenUrl = 'https://accounts.spotify.com/api/token';
//     const body = new URLSearchParams({
//         grant_type: 'authorization_code',
//         code: code,
//         redirect_uri: redirectUri,
//     });

//     const base64Credentials = btoa(`${clientId}:${clientSecret}`);

//     fetch(tokenUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': `Basic ${base64Credentials}`
//         },
//         body: body
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.error) {
//             throw new Error(`Token exchange error: ${data.error}`);
//         }
//         accessToken = data.access_token;
//         const expiresIn = data.expires_in * 1000;
//         tokenExpirationTime = new Date().getTime() + expiresIn;
        
//         localStorage.setItem('spotify_access_token', accessToken);
//         localStorage.setItem('spotify_token_expiration', tokenExpirationTime);
        
//         // debugLog('Token exchanged successfully');
//         getCurrentlyPlaying(accessToken);
//     })
//     .catch(error => {
//         // debugLog(`Error exchanging token: ${error}`);
//     });
// }

// function getCurrentlyPlaying(accessToken) {
//     fetch('https://api.spotify.com/v1/me/player/currently-playing', {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`
//         }
//     })
//     .then(response => {
//         if (response.status === 204) {
//             updateNotPlayingInfo();
//             return null;
//         }
//         if (!response.ok) {
//             return response.text().then(text => {
//                 throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
//             });
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data === null) {
//             // We've already handled this case (nothing playing)
//             return;
//         }
//         if (data.currently_playing_type === 'ad') {
//             updateAdInfo();
//         } else if (data.item) {
//             updateTrackInfo(data);
//             if (data.is_playing) {
//                 updateProgressBar(data);
//             } else {
//                 pauseProgressBar(data);
//             }
//         } else {
//             updateNotPlayingInfo();
//         }
//     })
//     .catch(error => {
//         debugLog(`Error occurred: ${error.message}`);
//         updateNotPlayingInfo();
//     });
// }

// function updateNotPlayingInfo() {
//     document.getElementById('song-name').textContent = 'Currently Not Listening to Anything or Anyone!';
//     document.getElementById('artist-name').textContent = '';
//     document.getElementById('song-cover').innerHTML = '<svg viewBox="0 0 32 32" id="heavyexclamationmarksymbol_Dark" data-name="heavyexclamationmarksymbol/Dark" xmlns="http://www.w3.org/2000/svg" fill="transparent"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="Path" d="M0,0H12V2H10V4H8v8h2v4h2v2h2v2h2V18h2V16h2V12h2V4H20V2H18V0H32V32H18V30h2V24H18V22H12v2H10v6h2v2H0Z"></path> <path id="Path-2" data-name="Path" d="M0,0H6V2H8V4h2v8H8v4H6v2H4v2H2V18H0V16H2V12H0V4H2V2H0Z" transform="translate(12)"></path> <path id="Path-3" data-name="Path" d="M0,0H2V2H0Z" transform="translate(10 2)"></path> <path id="Path-4" data-name="Path" d="M0,0H2V2H0Z" transform="translate(12 2)"></path> <path id="Path-5" data-name="Path" d="M0,0H2V8H0Z" transform="translate(8 4)"></path> <path id="Path-6" data-name="Path" d="M0,0H2V8H0Z" transform="translate(10 4)"></path> <path id="Path-7" data-name="Path" d="M0,0H2V4H0Z" transform="translate(10 12)"></path> <path id="Path-8" data-name="Path" d="M0,0H2V4H0Z" transform="translate(12 12)"></path> <path id="Path-9" data-name="Path" d="M0,0H6V2H8V8H6v2H0V8H4V6H2V2H0Z" transform="translate(12 22)"></path> <path id="Path-10" data-name="Path" d="M0,0H2V6H0Z" transform="translate(10 24)"></path> <path id="Path-11" data-name="Path" d="M0,0H2V4H4V6H0Z" transform="translate(12 24)"></path> </g></svg>';
//     clearProgressBar();
// }

// function updateTrackInfo(data) {
//     const songName = data.item.name;
//     const artistName = data.item.artists.map(artist => artist.name).join(', ');
//     const albumCover = data.item.album.images[0].url;

//     document.getElementById('song-name').textContent = songName;
//     document.getElementById('artist-name').textContent = "By " + artistName;
//     document.getElementById('song-cover').innerHTML = `<img src="${albumCover}" alt="Album Cover" style="width:100%;height:auto;">`;

//     // debugLog(`Now playing: ${songName} by ${artistName}`);
// }

// function updateProgressBar(data) {
//     const progressMs = data.progress_ms;
//     const durationMs = data.item.duration_ms;
//     const progressPercent = (progressMs / durationMs) * 100;

//     document.getElementById('progress').style.width = `${progressPercent}%`;

//     updateTimestamps(progressMs, durationMs);

//     if (window.progressInterval) {
//         clearInterval(window.progressInterval);
//     }

//     window.progressInterval = setInterval(() => {
//         const currentProgress = parseFloat(document.getElementById('progress').style.width);
//         if (currentProgress < 100) {
//             const increment = (100 / (durationMs / 100));
//             const newProgress = Math.min(currentProgress + increment, 100);
//             document.getElementById('progress').style.width = `${newProgress}%`;

//             const newProgressMs = (newProgress / 100) * durationMs;
//             updateTimestamps(newProgressMs, durationMs);
//         } else {
//             clearInterval(window.progressInterval);
//             getCurrentlyPlaying(accessToken);
//         }
//     }, 100);
// }

// function updateTimestamps(progressMs, durationMs) {
//     const currentTime = formatTime(progressMs);
//     const totalTime = formatTime(durationMs);
    
//     document.getElementById('current-time').textContent = currentTime;
//     document.getElementById('total-time').textContent = totalTime;
// }

// function formatTime(ms) {
//     const seconds = Math.floor(ms / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
// }

// function updateTrackInfo(data) {
//     if (data.currently_playing_type === 'ad') {
//         console.log("ADDDDDDDD")
//         updateAdInfo();
//     } else {
//         const songName = data.item.name;
//         const artistName = data.item.artists.map(artist => artist.name).join(', ');
//         const albumCover = data.item.album.images[0].url;

//         document.getElementById('song-name').textContent = songName;
//         document.getElementById('artist-name').textContent = "By " + artistName;
//         document.getElementById('song-cover').innerHTML = `<img src="${albumCover}" alt="Album Cover" style="width:100%;height:auto;">`;

//         updateTimestamps(data.progress_ms, data.item.duration_ms);
//     }
// }

// // function updateAdInfo() {
// //     document.getElementById('song-name').textContent = 'Ad Playing';
// //     document.getElementById('artist-name').textContent = '';
// //     document.getElementById('song-cover').innerHTML = `
// //         <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
// //             <rect width="100" height="100" fill="#1DB954"/>
// //             <text x="50" y="50" font-family="Arial" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">Ad</text>
// //         </svg>
// //     `;

// //     document.getElementById('current-time').textContent = '--:--';
// //     document.getElementById('total-time').textContent = '--:--';
// // }

// function pauseProgressBar(data) {
//     if (window.progressInterval) {
//         clearInterval(window.progressInterval);
//     }
//     const progressMs = data.progress_ms;
//     const durationMs = data.item.duration_ms;
//     const progressPercent = (progressMs / durationMs) * 100;

//     document.getElementById('progress').style.width = `${progressPercent}%`;
//     updateTimestamps(progressMs, durationMs);
// }

// function clearProgressBar() {
//     if (window.progressInterval) {
//         clearInterval(window.progressInterval);
//     }
//     document.getElementById('progress').style.width = '0%';
//     document.getElementById('current-time').textContent = '00:00';
//     document.getElementById('total-time').textContent = '00:00';
// }

// function updateAdInfo() {
//     clearProgressBar()
//     document.getElementById('song-name').textContent = 'Bla Bla Bla';
//     document.getElementById('artist-name').textContent = 'By Spotify';
//     document.getElementById('song-cover').innerHTML = `
//         <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
//                     width="100%" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
//                 <path fill="transparent" opacity="1.000000" stroke="none" 
//                     d="
//                 M223.000000,513.000000 
//                     C148.684677,513.000000 74.869362,513.000000 1.027019,513.000000 
//                     C1.027019,342.392975 1.027019,171.785965 1.027019,1.089473 
//                     C171.565353,1.089473 342.130768,1.089473 512.848083,1.089473 
//                     C512.848083,171.666565 512.848083,342.333252 512.848083,513.000000 
//                     C416.452606,513.000000 319.976288,513.000000 223.000000,513.000000 
//                 M116.018707,342.920929 
//                     C117.519714,343.947083 118.983330,345.788574 120.528145,345.859436 
//                     C127.511757,346.179718 134.518326,345.997314 141.516632,346.000122 
//                     C144.648880,346.001373 146.111542,344.813660 146.071671,341.314819 
//                     C145.902679,326.487000 145.992661,311.656189 146.013275,296.826477 
//                     C146.015030,295.570648 146.203690,294.315063 146.282120,293.347931 
//                     C171.769791,293.347931 196.838852,293.347931 222.000000,293.347931 
//                     C222.000000,309.353058 222.140137,325.012512 221.907532,340.666443 
//                     C221.844528,344.905640 223.555496,346.092896 227.335678,346.029144 
//                     C233.665680,345.922363 240.007492,345.799469 246.327347,346.074249 
//                     C250.197372,346.242493 251.071106,344.713287 251.064392,341.119354 
//                     C250.969681,290.465149 250.943649,239.810547 251.099213,189.156631 
//                     C251.112747,184.758224 249.603867,183.765045 245.603638,183.925537 
//                     C238.839935,184.196884 232.057434,184.000000 224.895508,184.000000 
//                     C224.895508,175.098083 224.895508,166.686829 224.895508,158.000504 
//                     C198.535660,158.000504 172.573654,158.026962 146.611862,157.963928 
//                     C143.673447,157.956802 142.925476,159.278000 142.963959,161.939178 
//                     C143.069077,169.206635 143.000137,176.476593 143.000137,184.000000 
//                     C136.001358,184.000000 129.530136,183.997681 123.058922,184.000626 
//                     C116.296669,184.003708 116.000999,184.295563 116.000847,191.041260 
//                     C115.999687,241.362381 116.000793,291.683502 116.018707,342.920929 
//                 M323.500000,158.000000 
//                     C305.743988,158.000000 287.987976,158.000000 270.243774,158.000000 
//                     C270.243774,220.602295 270.243774,282.648499 270.243774,344.768677 
//                     C297.548798,344.768677 324.609467,344.768677 352.065125,344.768677 
//                     C352.065125,336.137634 352.065125,327.728333 352.065125,318.936584 
//                     C360.860626,318.936584 369.269989,318.936584 378.061707,318.936584 
//                     C378.061707,310.141266 378.061707,301.732971 378.061707,293.000000 
//                     C385.411804,293.000000 392.373932,292.877411 399.328918,293.047424 
//                     C403.301056,293.144501 405.053772,291.666016 405.039886,287.572144 
//                     C404.958618,263.586456 404.954437,239.600159 405.044922,215.614517 
//                     C405.059937,211.630539 403.592224,209.870667 399.515778,209.957840 
//                     C392.421295,210.109497 385.321228,210.000031 377.999969,210.000031 
//                     C377.999969,202.473175 377.846924,195.496338 378.064301,188.531052 
//                     C378.173584,185.030350 376.994507,183.826614 373.479675,183.934952 
//                     C366.391235,184.153427 359.291321,184.000031 351.815613,184.000031 
//                     C351.815613,175.014755 351.815613,166.606201 351.815613,158.000000 
//                     C342.447296,158.000000 333.473633,158.000000 323.500000,158.000000 
//                 z"/>
//                 <path fill="var(--themeColor)" opacity="1.000000" stroke="none" 
//                     d="
//                 M116.009949,342.462769 
//                     C116.000793,291.683502 115.999687,241.362381 116.000847,191.041260 
//                     C116.000999,184.295563 116.296669,184.003708 123.058922,184.000626 
//                     C129.530136,183.997681 136.001358,184.000000 143.000137,184.000000 
//                     C143.000137,176.476593 143.069077,169.206635 142.963959,161.939178 
//                     C142.925476,159.278000 143.673447,157.956802 146.611862,157.963928 
//                     C172.573654,158.026962 198.535660,158.000504 224.895508,158.000504 
//                     C224.895508,166.686829 224.895508,175.098083 224.895508,184.000000 
//                     C232.057434,184.000000 238.839935,184.196884 245.603638,183.925537 
//                     C249.603867,183.765045 251.112747,184.758224 251.099213,189.156631 
//                     C250.943649,239.810547 250.969681,290.465149 251.064392,341.119354 
//                     C251.071106,344.713287 250.197372,346.242493 246.327347,346.074249 
//                     C240.007492,345.799469 233.665680,345.922363 227.335678,346.029144 
//                     C223.555496,346.092896 221.844528,344.905640 221.907532,340.666443 
//                     C222.140137,325.012512 222.000000,309.353058 222.000000,293.347931 
//                     C196.838852,293.347931 171.769791,293.347931 146.282120,293.347931 
//                     C146.203690,294.315063 146.015030,295.570648 146.013275,296.826477 
//                     C145.992661,311.656189 145.902679,326.487000 146.071671,341.314819 
//                     C146.111542,344.813660 144.648880,346.001373 141.516632,346.000122 
//                     C134.518326,345.997314 127.511757,346.179718 120.528145,345.859436 
//                     C118.983330,345.788574 117.519714,343.947083 116.009949,342.462769 
//                 M146.000000,200.507874 
//                     C146.000000,221.259460 146.000000,242.011047 146.000000,262.739441 
//                     C171.611298,262.739441 196.670425,262.739441 221.707596,262.739441 
//                     C223.250824,242.659332 222.372849,192.960907 220.430573,187.291534 
//                     C195.666885,187.291534 170.937149,187.291534 146.000000,187.291534 
//                     C146.000000,191.557907 146.000000,195.534439 146.000000,200.507874 
//                 z"/>
//                 <path fill="var(--themeColor)" opacity="1.000000" stroke="none" 
//                     d="
//                 M324.000000,158.000000 
//                     C333.473633,158.000000 342.447296,158.000000 351.815613,158.000000 
//                     C351.815613,166.606201 351.815613,175.014755 351.815613,184.000031 
//                     C359.291321,184.000031 366.391235,184.153427 373.479675,183.934952 
//                     C376.994507,183.826614 378.173584,185.030350 378.064301,188.531052 
//                     C377.846924,195.496338 377.999969,202.473175 377.999969,210.000031 
//                     C385.321228,210.000031 392.421295,210.109497 399.515778,209.957840 
//                     C403.592224,209.870667 405.059937,211.630539 405.044922,215.614517 
//                     C404.954437,239.600159 404.958618,263.586456 405.039886,287.572144 
//                     C405.053772,291.666016 403.301056,293.144501 399.328918,293.047424 
//                     C392.373932,292.877411 385.411804,293.000000 378.061707,293.000000 
//                     C378.061707,301.732971 378.061707,310.141266 378.061707,318.936584 
//                     C369.269989,318.936584 360.860626,318.936584 352.065125,318.936584 
//                     C352.065125,327.728333 352.065125,336.137634 352.065125,344.768677 
//                     C324.609467,344.768677 297.548798,344.768677 270.243774,344.768677 
//                     C270.243774,282.648499 270.243774,220.602295 270.243774,158.000000 
//                     C287.987976,158.000000 305.743988,158.000000 324.000000,158.000000 
//                 M357.542847,290.000000 
//                     C363.304077,290.000000 369.065308,290.000000 374.698242,290.000000 
//                     C374.698242,263.991089 374.698242,238.588913 374.698242,212.790695 
//                     C365.990204,212.790695 357.578766,212.790695 348.785553,212.790695 
//                     C348.785553,203.984909 348.785553,195.573364 348.785553,187.307709 
//                     C331.980652,187.307709 315.576630,187.307709 299.302856,187.307709 
//                     C299.302856,230.348740 299.302856,273.081451 299.302856,315.696320 
//                     C316.011200,315.696320 332.415131,315.696320 349.213348,315.696320 
//                     C349.213348,306.986389 349.213348,298.575043 349.213348,290.000000 
//                     C351.927673,290.000000 354.243774,290.000000 357.542847,290.000000 
//                 z"/>
//                 <path fill="transparent" opacity="1.000000" stroke="none" 
//                     d="
//                 M146.000000,200.009430 
//                     C146.000000,195.534439 146.000000,191.557907 146.000000,187.291534 
//                     C170.937149,187.291534 195.666885,187.291534 220.430573,187.291534 
//                     C222.372849,192.960907 223.250824,242.659332 221.707596,262.739441 
//                     C196.670425,262.739441 171.611298,262.739441 146.000000,262.739441 
//                     C146.000000,242.011047 146.000000,221.259460 146.000000,200.009430 
//                 z"/>
//                 <path fill="transparent" opacity="1.000000" stroke="none" 
//                     d="
//                 M357.051361,290.000000 
//                     C354.243774,290.000000 351.927673,290.000000 349.213348,290.000000 
//                     C349.213348,298.575043 349.213348,306.986389 349.213348,315.696320 
//                     C332.415131,315.696320 316.011200,315.696320 299.302856,315.696320 
//                     C299.302856,273.081451 299.302856,230.348740 299.302856,187.307709 
//                     C315.576630,187.307709 331.980652,187.307709 348.785553,187.307709 
//                     C348.785553,195.573364 348.785553,203.984909 348.785553,212.790695 
//                     C357.578766,212.790695 365.990204,212.790695 374.698242,212.790695 
//                     C374.698242,238.588913 374.698242,263.991089 374.698242,290.000000 
//                     C369.065308,290.000000 363.304077,290.000000 357.051361,290.000000 
//                 z"/>
//             </svg>
//     `;
// }

// setInterval(() => {
//     if (accessToken) {
//         getCurrentlyPlaying(accessToken);
//     }
// }, 10000);