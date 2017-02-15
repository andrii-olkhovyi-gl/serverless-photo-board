function Card(data, board) {
    this.id = data.id;
    this.data = data;
    this.parentBoard = board;

    var cardEl = document.createElement('div');
    cardEl.id = 'card-' + data.id;
    cardEl.className = 'card';

    var imgContEl = document.createElement('div');
    imgContEl.className = 'img-container';
    cardEl.appendChild(imgContEl);

    if (!data.imageUrl) {
        var uploadBtn = document.createElement('button');
        uploadBtn.className = 'btn btn-upload';
        uploadBtn.innerHTML = 'Upload image';
        imgContEl.appendChild(uploadBtn);
        this.uploadBtn = uploadBtn;
    } else {
        var img = new Image();
        img.src = data.imageUrl;
        imgContEl.appendChild(img);
    }

    var titleEl = document.createElement('h4');
    cardEl.appendChild(titleEl);

    this.cardEl = cardEl;
    this.titleEl = titleEl;
    this.imgContEl = imgContEl;
}

Card.prototype = {
    constructor: Card,
    create: function() {
        var card = this;
        this.titleEl.innerHTML = this.data.title;
        this.cardEl.style.left = this.data.position.x + 'px';
        this.cardEl.style.top = this.data.position.y + 'px';
        this.cardEl.addEventListener('mousedown', function(ev) {
            ev.card = card;
        });
        if (this.uploadBtn) {
            this.uploadBtn.addEventListener('click', function() {
                imageService(card).prepareAndUpload();
            });
        }
        this.parentBoard.boardEl.appendChild(this.cardEl);
    },
    destroy: function() {
        this.parentBoard.boardEl.removeChild(this.cardEl);
    },
    setPosition: function(x,y) {
        this.data.position.x = x;
        this.data.position.y = y;
    },
    toggleSpinner: function(val) {
        if (val) {
            this.uploadBtn && this.uploadBtn.parentNode.removeChild(this.uploadBtn);
            this.loaderEl = document.createElement('div');
            this.loaderEl.className = 'loader';
            this.imgContEl.appendChild(this.loaderEl);
        } else {
            this.loaderEl.parentNode.removeChild(this.loaderEl);
            this.loaderEl = null;
        }
    },
    addImage: function(imageData) {
        var img = new Image();
        img.src = imageData.url;
        this.imgContEl.appendChild(img);
        this.data.imageUrl = imageData.url;
        this.data.imageName = imageData.name;
        this.parentBoard.save();
    }
};