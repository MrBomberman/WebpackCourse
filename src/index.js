import Post from './Post';
import json from './assets/json.json';
import xml from './assets/data.xml'; // импортируем из файла информацию через переменную
import './styles/styles.css';
import WebpackLogo from './assets/webpack-logo.png';

const post = new Post('Webpack Post Title', WebpackLogo); // здесь класс из другого скрипта доступен, потому что мы подключили его раньше

console.log('Post to string', post.toString());

console.log('Json:',json);
console.log('XML:', xml );