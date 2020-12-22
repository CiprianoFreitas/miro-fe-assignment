import EmailsInput from './emails-input';

const container = document.getElementById('emails-input');
const emailsInput = new EmailsInput(container);

document.getElementById('btnAdd').addEventListener('click', () => {
  const randoSeq =
    Math.random().toString(36).substring(2, 6) +
    Math.random().toString(36).substring(2, 6);
  emailsInput.addEmails(`${randoSeq}@mail.com`);
});
document.getElementById('btnCountValid').addEventListener('click', () => {
  alert(emailsInput.getEmails().length);
});
