import * as $ from 'jquery';
import Post from '@models/Post';
// import json from './assets/json.json';
// import xml from './assets/data.xml'; // импортируем из файла информацию через переменную
import './styles/styles.css';
// import csv from './assets/oscar_age_female.csv';
import WebpackLogo from './assets/webpack-logo.png';
import './styles/less.less';
import './styles/scss.scss';
import './babel';
import React from 'react';
import {render} from 'react-dom';
const post = new Post('Webpack Post Title', WebpackLogo); // здесь класс из другого скрипта доступен, потому что мы подключили его раньше

$('pre').addClass('code').html(post.toString()); // обращаемся к jquery, берем тег pre и вешаем на него html наш пост


const App = () => (
    <div class="container">
        <h1>Webpack Course</h1>

            <hr /> 

            <div class="logo" />

            <hr />

            <pre></pre>

            <hr />

            <div class='box'>
                <h2>Less</h2>
            </div>

            <div class='card'>
                <h2>Sass</h2>
            </div>
    </div>
)
render(<App/>, document.getElementById('app'));
// console.log('Json:',json);
// console.log('XML:', xml );
// console.log('CSV:', csv);