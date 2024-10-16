const coordinates = {
   getBlockCoordinates: (block) => {
      return {start: block.offsetTop, end: block.offsetTop + block.scrollHeight};
   },
   screenDevice: () => {
      return {start: window.pageYOffset, end: window.pageYOffset + window.innerHeight};
   }
};

const commentWrapper = document.querySelector('.comments__kma'),
      commentWrite = document.querySelector('.comment-write'),
      blockComment = document.querySelector('.comment-hide'),
      heightCommnet = Math.abs(coordinates.getBlockCoordinates(blockComment).start - coordinates.getBlockCoordinates(blockComment).end) + 30;

// commentWrapper.style.marginTop = `-${heightCommnet}px`;
window.onscroll = (event) => {
    if(coordinates.getBlockCoordinates(commentWrite).start < coordinates.screenDevice().end) {
        this.onscroll = null;
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        }).then(() => {
            commentWrite.style.maxHeight = '0';
            commentWrite.style.margin = '0';
            commentWrite.style.padding = '0';
            commentWrite.style.border = 'none';
            commentWrapper.style.marginTop = '0';
            setTimeout( () =>  blockComment.classList.remove('comment-hide'), 300)
        });
    }
}

//Иногда лучше в if
var bodyRect = document.body.getBoundingClientRect(),
    elemRect = commentWrite.getBoundingClientRect(),
    offset = elemRect.top - bodyRect.top - 300;