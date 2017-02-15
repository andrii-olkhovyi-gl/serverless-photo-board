document.addEventListener('DOMContentLoaded', init, false);

function init() {
    var topbar = Topbar();
    var fbDB = FirebaseDB();
    var fbStg = FirebaseStg();
    var board;

    firebase.auth().onAuthStateChanged(function(user) {
        topbar.refreshUser(user);
        if (user) {
            fbDB.setupRefs();
            fbDB.checkUserExists(user);
            fbStg.setupRefs();
            setupBoard(user.uid);
        } else {
            _clearBoard();
        }
    });

    function setupBoard(id) {
        _clearBoard();
        var boardRef = fbDB.getBoardRef(id);
        var imagesStgRef = fbStg.getImagesRef(id);
        boardRef.once('value').then(function(snapshot) {
            var data = snapshot.val();
            board = new Board(data, boardRef, imagesStgRef);
            board.create().drawAllCards().setListeners();
        });
    }

    function _clearBoard() {
        board && board.destroy();
        board = null;
    }
}
