import '../css/index.scss';
import icon from '../img/user/33.png';
const hello=require('./hello.js');
const root=document.getElementById('root');
root.appendChild(hello());

var myIcon=new Image();
myIcon.src=icon;
root.appendChild(myIcon);
