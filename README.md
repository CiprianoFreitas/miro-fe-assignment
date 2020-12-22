# Cipriano Freitas - Miro FE assignment

This repo is automatically deployed to: https://miro-test.ciprianofreitas.vercel.app

# EmailsInput

EmailsInput is a component that allows to transform an element on a page into an email address field.

## How to use

1. Import EmailsInput into your page.

```
import EmailsInput from './emails-input';
```

2. Grab the container you want to transform and initialise EmailsInput on that element.

```
const container = document.getElementById('emails-input');
const emailsInput = new EmailsInput(container);
```

3. The component exposes two methods that can be used to add emails and get the valid emails programatically.

_Adding and email_

```
emailsInput.addEmails(`cipri@miro.com`);
```

_Getting the list of valid emails_

```
emailsInput.getEmails() // ['cipri@miro.com']
```

## What could be improved?

- Removing last entered email on a backspace press
- Testing
