import Post from './Post';

const post = new Post('Webpack Post Title'); // здесь класс из другого скрипта доступен, потому что мы подключили его раньше

console.log('Post to string', post.toString());