import { generateGuid } from '../utilities/uuid';

class FormValidator {
  /**
   * Creates an instance of FormValidator.
   * @author Francis Rubio
   * @param {HTMLFormElement} form the form to watch for validations
   * @memberof FormValidator
   */
  constructor(form) {
    if (form == null) return

    this.form = form
    this.form.setAttribute('novalidate', 'novalidate')
    form.addEventListener('submit', e => {
      if (!form.checkValidity()) {
        e.preventDefault();
      }
    })

    const inputs = [...form]
    inputs.filter(input => input.required).forEach(input => {
      input.addEventListener('invalid', e => {
        input.parentElement.classList.add('has-error')
        this.determineError(input)
      })

      input.addEventListener('change', e => {
        const valid = input.checkValidity()

        if (valid) {
          input.parentElement.classList.remove('has-error')
        }
      })
    })
  }

  /**
   * @description Shows an error message to the user
   * @author Francis Rubio
   * @param {HTMLInputElement|HTMLTextAreaElement} input the input that raised the validation error
   * @memberof FormValidator
   */
  determineError(input) {
    const requiredButEmpty = input.required && input.value.length <= 0
    const invalidEmail = !FormValidations.checkEmailValidity(input.value)
    const inputStatus = this.getOrCreateStatusElement(input)

    console.log(inputStatus)
    console.log({ invalidEmail })

    if (requiredButEmpty) {
      inputStatus.innerText = FormErrors.REQUIRED
    } else if (invalidEmail) {
      inputStatus.innerText = FormErrors.EMAIL
    }
  }

  /**
   * @description Gets the form control's error message element, or creates one if it doesn't exist.
   * @author Francis Rubio
   * @param {HTMLInputElement|HTMLTextAreaElement} input
   * @memberof FormValidator
   * @returns {HTMLElement} The error message element, or null if the input is not in a .form-group
   */
  getOrCreateStatusElement(input) {
    if (input.parentElement.matches('.form-group')) {
      console.log('[STATUS] Parent matches')
      let inputStatus = input.parentElement.querySelector('.form-status')
      console.log({ inputStatus })
      if (inputStatus == null) {
        inputStatus = document.createElement('p')
        inputStatus.classList.add('form-status')

        const id = generateGuid()
        input.setAttribute('aria-describedby', id)
        inputStatus.id = id
        input.insertAdjacentElement('afterend', inputStatus)
      }

      return inputStatus


    } else {
      return
    }
  }
}

/** 
 * @readonly
 * @enum {String}
 */
const FormErrors = {
  REQUIRED: "This field cannot be empty",
  EMAIL: "This should be an email address"
}

class FormValidations {
  /**
   * @description Checks validity of email
   * @author Francis Rubio
   * @param {string} email the email to check for validity
   * @returns true if valid, false if invalid
   */
  static checkEmailValidity(email) {
    const matches = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
      );

    return !!matches
  }
}

export { FormValidator }