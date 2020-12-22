import './styles.pcss';
const template = `<div class="emails-input">
      <div class="emails-input__container"></div><input class="emails-input__input" type="email" aria-label="add more people..." placeholder="add more people...">
    </div>`;

const createEmailPill = (email: string) => {
  return `${email}
            <button class="email__btn-delete" title="Delete email">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z" fill="#050038"/>
              </svg>
            </button>
        `;
};

const isEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

class EmailsInput {
  _addedEmails: string[];
  _enteredEmailsContainer: HTMLDivElement;
  _newEmailInputEl: HTMLInputElement;
  container;

  constructor(container: HTMLElement) {
    this._addedEmails = [];

    container.innerHTML = template;

    this._enteredEmailsContainer = container.querySelector<HTMLDivElement>(
      '.emails-input__container'
    )!;

    this._newEmailInputEl = container.querySelector<HTMLInputElement>(
      '.emails-input__input'
    )!;

    this.container = container;

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onInputBlur = this._onInputBlur.bind(this);
    this._onFocusInput = this._onFocusInput.bind(this);
    this._onPaste = this._onPaste.bind(this);

    this._addEventListeners();
  }

  _addEventListeners() {
    this._newEmailInputEl.onkeydown = this._onKeyDown;
    this._newEmailInputEl.onblur = this._onInputBlur;
    this.container.onclick = this._onFocusInput;
    this.container.onpaste = this._onPaste;
  }

  _onPaste(evt: ClipboardEvent) {
    evt.preventDefault();
    let clipboardData = evt.clipboardData || (<any>window).clipboardData;
    let data = clipboardData.getData('Text');

    this.addEmails(data);
  }

  _onKeyDown(evt: KeyboardEvent) {
    switch (evt.key) {
      case ',':
      case 'Enter':
        evt.preventDefault();
        this.addEmails(this._newEmailInputEl.value);
        this._newEmailInputEl.value = '';
        break;
    }
  }

  _onInputBlur(evt: FocusEvent) {
    const target = evt.currentTarget as HTMLInputElement;
    if (!target) return;
    const value = target.value;
    this.addEmails(value);
    target.value = '';
  }

  _onFocusInput(evt: FocusEvent) {
    if (evt.target === this.container) {
      this._newEmailInputEl.focus();
    }
  }

  _deleteEmail(email: string) {
    const index = this._addedEmails.indexOf(email);
    if (index > -1) {
      this._addedEmails.splice(index, 1);
    }
  }

  addEmails(emails: string) {
    console.log('what');
    if (!emails) return;
    let emailList = [];
    emailList = emails
      .split(',')
      .map((e: string) => e.toLowerCase().trim())
      .filter((e: string) => this._addedEmails.indexOf(e) === -1);

    const fragment = document.createDocumentFragment();
    Array.from(new Set(emailList)).forEach(email => {
      this._addedEmails.push(email.trim());
      const emailPillEl = document.createElement('div');
      emailPillEl.className = 'email emails-input__email';
      if (!isEmailValid(email)) emailPillEl.className += ' email--invalid';
      emailPillEl.innerHTML = createEmailPill(email);
      const btnDeleteEl = emailPillEl.querySelector<HTMLButtonElement>(
        '.email__btn-delete'
      )!;
      btnDeleteEl.onclick = () => {
        this._deleteEmail(email);
        this._enteredEmailsContainer.removeChild(emailPillEl);
      };
      fragment.appendChild(emailPillEl);
    });

    this._enteredEmailsContainer.appendChild(fragment);
  }

  getEmails() {
    return this._addedEmails.filter(email => isEmailValid(email));
  }
}

export default EmailsInput;
