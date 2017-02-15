document.addEventListener('DOMContentLoaded', init, false);

function init() {
    var topbar = Topbar();
    var fbDB = FirebaseDB();
    var board;

    firebase.auth().onAuthStateChanged(function(user) {
        topbar.refreshUser(user);
        if (user) {
            fbDB.setupRefs();
            fbDB.checkUserExists(user);
            setupBoard(user.uid);
        } else {
            _clearBoard();
        }
    });

    function setupBoard(id) {
        board && board.destroyEl();
        var boardRef = fbDB.getBoardRef(id);
        boardRef.once('value').then(function(snapshot) {
            var data = snapshot.val();
            board = new Board(data, boardRef);
            board.create().drawAllCards().setListeners();
        });
    }

    function _clearBoard() {
        board && board.destroy();
        board = null;
    }
}