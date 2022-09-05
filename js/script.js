//Make an array of all the collipse buttons
let buttm = document.getElementsByClassName('collapsible');

Array.from(buttm).forEach((btns) => {
  btns.addEventListener('click', (e) => {
    e.target.classList.toggle('active');
    let content = e.target.nextElementSibling;

    //if the height of the content is 0
    //apply the clientHeight of the first child
    //so we can render the content(articles) completely;
    if (content.clientHeight) {
      content.style.height = 0;
      btns.style.textAlign = 'left';
      btns.firstElementChild.innerHTML = '&#8618;';
      btns.firstElementChild.style.fontSize = '3rem';
    } else {
      content.style.height = content.firstElementChild.clientHeight + 'px';
      btns.style.textAlign = 'center';
      btns.firstElementChild.innerHTML = '&#8628;';
      btns.firstElementChild.style.fontSize = '3rem';
    }
  });
});

function closeBtnAndOpen(btn) {
  if (btn.hasAttribute('disabled')) {
    btn.removeAttribute('disabled');
    btn.style.backgroundColor = '#f4511e';
    btn.style.pointerEvents = 'all';
  } else {
    btn.setAttribute('disabled', 'disabled');
    btn.style.backgroundColor = 'rgba(105,105,105,0.5)';
    btn.style.pointerEvents = 'none';
  }
}

//Palidrome Checker
function palindrome(palindrome) {
  if (!/^\w+/gm.test(palindrome.value)) {
    return false;
  }
  //assign a start and a end delimiters
  let start = 0;
  let end = palindrome.length - 1;

  //end and start delimiter won't always meet in the middle, so use (end > start)
  while (end > start) {
    //increments start delimiter if current character is not meet
    if (palindrome[start].match(/[\W_]/)) {
      start++;
      continue;
    }
    //decrements end delimiter if current character doesn't meet criteria
    if (palindrome[end].match(/[\W_]/)) {
      end--;
      continue;
    }
    //finally does the comparison on the current character
    if (palindrome[start].toLowerCase() !== palindrome[end].toLowerCase())
      return false;
    start++;
    end--;
  }

  //if the whole palindromeing has been compared without returning false, it's a palindrome.
  return true;
}

//fuction to show the images for a period time
function PalidromeImages(image, duration) {
  setTimeout(() => {
    image.style.display = 'none';
    closeBtnAndOpen(palindromeBtn);
  }, duration);
}

let palindromeText = document.querySelector('#Palindrome_area');
let palindromeBtn = document.querySelector('#Palindrome_btn');

let thump_Images = document.querySelectorAll('.thump');

palindromeBtn.addEventListener('click', (e) => {
  //if the value introduce in the textarea is
  //valid, excute the piece of code.
  if (palindromeText.value) {
    closeBtnAndOpen(palindromeBtn);

    if (palindrome(palindromeText.value)) {
      thump_Images[0].style.position = 'relative';
      thump_Images[0].style.bottom = '35rem';
      thump_Images[0].style.display = 'inline-block';

      PalidromeImages(thump_Images[0], 3000);
    } else {
      thump_Images[1].style.position = 'relative';
      thump_Images[1].style.bottom = '35rem';
      thump_Images[1].style.display = 'inline-block';

      PalidromeImages(thump_Images[1], 3000);
    }
  }
});

//Roman Numeral Checker

//this function check if a number is in the range of
//1-7000, then convert that number to a roman numeral
//by comparing if the current decimal value can be form
//with a certain range in the roman numeral array.
function convertToRoman(num) {
  if (num > 7000) {
    return 'Numbers from 1-700 only';
  } else {
    let decimalValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let romanNumeral = [
      'M',
      'CM',
      'D',
      'CD',
      'C',
      'XC',
      'L',
      'XL',
      'X',
      'IX',
      'V',
      'IV',
      'I',
    ];

    let romanized = '';
    let isZero = false;
    for (let index = 0; index < decimalValue.length; index++) {
      while (decimalValue[index] <= num) {
        romanized += romanNumeral[index];
        num -= decimalValue[index];

        //if num is equal to 0 means that
        //we already got the representation
        //in roman version, so we can break
        //out of the two loops
        if (num === 0) {
          isZero == true;
          break;
        }
      }

      if (isZero) {
        break;
      }
    }

    return romanized;
  }
}

//Fuction to show the roman number
//that we got thanks to the convertToRoman method.
function showRomanNumber(number) {
  const canvas = document.getElementById('roman-canvas');

  canvas.width = 420;
  canvas.height = 300;

  const ctx = canvas.getContext('2d');
  const image = new Image();

  image.setAttribute(
    'src',
    'https://drive.google.com/uc?export=view&id=1EH4X0LckSzVJIgosikHuoM1QfUZ0Iu5Q'
  );

  image.addEventListener('load', () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = '30px Times New Roman';
    ctx.fillStyle = 'red';
    canvas.style.display = 'block';
    if (number.length <= 10) {
      ctx.fillText(number, 75, 150);
    } else {
      ctx.fillText(number, 25, 150);
    }
  });
  setTimeout(() => {
    canvas.style.display = 'none';
    document.getElementById('roman-canvas2').style.display = 'block';
    closeBtnAndOpen(RomanCheckBtn);
  }, 6000);
}

let DecimalNumber = document.querySelector('#Num_area');
let RomanCheckBtn = document.querySelector('#Roman_btn');
let RomanNumer = '';

RomanCheckBtn.addEventListener('click', (e) => {
  closeBtnAndOpen(RomanCheckBtn);
  if (DecimalNumber.valueAsNumber) {
    RomanNumer = convertToRoman(DecimalNumber.value);
    showRomanNumber(RomanNumer);
  } else {
    showRomanNumber('Numbers from 1-700 only');
  }
});

//Ceasar's Cipher

function cipherCoding(cipher) {
  cipher = cipher.toUpperCase();

  // Split str into a character array
  return (
    cipher
      .split('')
      // Iterate over each character in the array
      .map.call(cipher, function (char) {
        // Convert char to a character code
        var x = char.charCodeAt(0);
        // Checks if character lies between A-Z
        if (x < 65 || x > 90) {
          return String.fromCharCode(x); // Return un-converted character
        }
        //N = ASCII 78, if the character code is less than 78, shift forward 13 places
        else if (x < 78) {
          return String.fromCharCode(x + 13);
        }
        // Otherwise shift the character 13 places backward
        return String.fromCharCode(x - 13);
      })
      .join('')
  ); // Rejoin the array into a string
}

//showing the cipher version of the string
function showCipher() {
  let ciphercode = cipherCoding(cipher_Text.value);
  cipherImage.style.display = 'none';
  showMessage.style.display = 'block';
  showMessage.style.position = 'relative';
  showMessage.style.bottom = '30rem';
  showMessage.children[1].textContent = ciphercode;

  cipher_Text.style.backgroundColor = 'rgba(0,0,0,0.4)';
  closeBtnAndOpen(cipherBtn);

  closeSpanBtn.addEventListener('click', (e) => {
    cipher_Text.style.backgroundColor = 'white';
    showMessage.style.display = 'none';
  });
}

let cipher_Text = document.getElementById('Cipher_area');
let cipherBtn = document.getElementById('cipher_btn');
let cipherImage = document.querySelector('#cipher-image');

let showMessage = document.querySelector('#myCipherText');
let closeSpanBtn = document.getElementsByClassName('close')[0];

cipherBtn.addEventListener('click', (e) => {
  if (cipher_Text.value) {
    closeBtnAndOpen(cipherBtn);
    cipherImage.style.display = 'inline-block';
    cipherImage.style.position = 'relative';
    cipherImage.style.bottom = '33rem';

    setTimeout(showCipher, 2000);
  }
});
