//spotivis
//client ID: f784a7131bc746d7973e1edfd5e1de48
//client secret: ae1b7827a3604f41832b7175bbcb0e06
/* Get playlist ownerID : spotifycharts
Global top 50 
id : 37i9dQZEVXbMDoHDwVN2tF
/v1/users/spotifycharts/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks

Taiwan top 50
id : 37i9dQZEVXbMnZEatlMSiu
/v1/users/spotifycharts/playlists/37i9dQZEVXbMnZEatlMSiu/tracks
*/
/*Get audio-feature for a track
https://api.spotify.com/v1/audio-features/{id}
*/
(function() {
    
    function login(callback) {
        var CLIENT_ID = 'f784a7131bc746d7973e1edfd5e1de48';
        var REDIRECT_URI = 'https://github.com/rootsofworld/DataVisHw/tree/master/hw2/spotivis-oauth/';
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
              '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
              '&scope=' + encodeURIComponent(scopes.join(' ')) +
              '&response_type=token';
        }
        
        var url = getLoginURL([
            'user-read-email'
        ]);
        
        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);
    
        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);
        
        var w = window.open(url,
                            'Spotify',
                            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                           );
        
    }

    function getUserData(accessToken) {
        return $.ajax({
            url: 'https://api.spotify.com/v1/me',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            }
        });
    }

    var loginButton = document.getElementById('login-btn');
    
    loginButton.addEventListener('click', function() {
        login(function(accessToken) {
            getUserData(accessToken)
                .then(function(response) {
                    loginButton.style.display = 'none';
                });
            });
    });
    
})();