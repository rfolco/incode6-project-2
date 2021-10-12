document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.querySelector('#submit-button');

  const formArr = Array.from(document.querySelectorAll('input:not(#phone)'));

  submitForm.addEventListener('click', (e) => {
    e.preventDefault();

    // Clears all invalid input messages

    const errorMessages = document.querySelectorAll('form p');
    errorMessages.forEach((p) => {
      p.classList.remove('show');
    });

    // Function that validades user's entries

    function isValid(inputValue, regex) {
      return regex.test(inputValue);
    }

    // Regular expressions for validating user's entries

    const nameRegex = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{0,20}$/;
    const surnameRegex = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{0,20}$/;
    const phoneRegex =
      /^(?:\+?61|0)4 ?(?:(?:[01] ?[0-9]|2 ?[0-57-9]|3 ?[1-9]|4 ?[7-9]|5 ?[018]) ?[0-9]|3 ?0 ?[0-5])(?: ?[0-9]){5}$/;
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const regexArr = [nameRegex, surnameRegex, emailRegex];

    // Gets values inserted by user

    const [firstName, surname, email] = formArr;
    const costumerMessage = document.querySelector('textarea').value;
    const phone = document.querySelector('#phone').value;

    // If all entries pass validation, displays modal and console logs user data. If not, display error message for the fields that didn't pass validation.

    if (
      formArr.every((element, index) => {
        return regexArr[index].test(element.value);
      }) &&
      (phone ? phoneRegex.test(phone) : true) &&
      costumerMessage !== ''
    ) {
      document.querySelector('.modal-bg').style.display = 'flex';
      document.querySelector('body').style.overflow = 'hidden';
      console.log(
        `First name: ${firstName.value}\nSurname: ${surname.value}\nPhone number: ${phone}\nE-mail: ${email.value}\nMessage: ${costumerMessage}`
      );
    } else {
      for (let i = 0; i < formArr.length; i++) {
        if (!isValid(formArr[i].value, regexArr[i])) {
          document
            .querySelector(`#${formArr[i].id}`)
            .nextElementSibling.classList.add('show');
        }
      }
      if (!isValid(phone, phoneRegex) && phone !== '') {
        document
          .querySelector('#phone')
          .nextElementSibling.classList.add('show');
      }
      if (costumerMessage === '') {
        document
          .querySelector('textarea')
          .nextElementSibling.classList.add('show');
      }
    }
  });

  // When modal is closed, all input fields are cleared

  const closeModal = document.querySelector('#fermer');

  closeModal.addEventListener('click', () => {
    for (let i = 0; i < formArr.length; i++) {
      document.querySelector(`#${formArr[i].id}`).value = '';
    }
    document.querySelector('#phone').value = '';
    document.querySelector('textarea').value = '';
    document.querySelector('.modal-bg').style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
  });
});
