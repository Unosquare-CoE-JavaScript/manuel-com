'use strict';

const test = function () {
  setTimeout(function () {
    console.log('Start of code');

    alert('Notice me');

    console.log('End of code');
  }, 100);
};

const test2 = function () {
  console.log('Now I get attention');
};

test();
test2();
