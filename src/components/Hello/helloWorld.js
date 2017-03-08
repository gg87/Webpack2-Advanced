import helloTpl from './helloWorld.hbs';

export default function hello() {
  console.log('Hello World!!');
  document.getElementById('container').innerHTML = helloTpl({
    firstName: 'John',
    lastName: 'Parker'
  });
}
