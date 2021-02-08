class Post{
    constructor(title, img){
        this.title = title;
        this.img = img;
        this.date = new Date();
    }

    toString(){
        return JSON.stringify(  {
            title: this.title,
            date: this.date.toJSON(),
            img: this.img
        }, null, 2); // задаем 2-м параметром null- риплейсер, 3-м параметром - кол-во пробелов
    }

    get uppercaseTitle() {
        return this.title.toUpperCase();
    }
}

export default Post;