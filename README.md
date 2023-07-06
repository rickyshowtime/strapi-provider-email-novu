---

# Strapi Provider Email - Novu

This is a custom email provider for Strapi that enables sending emails using Novu as the email service.

## Installation

Install the package via npm or yarn:

```bash
# npm
npm install strapi-provider-email-novu

# yarn
yarn add strapi-provider-email-novu
```

## Configuration

To configure the Novu email provider in your Strapi project, follow these steps:

1. Install the `strapi-provider-email-novu` package:

```bash
# npm
npm install strapi-provider-email-novu

# yarn
yarn add strapi-provider-email-novu
```

2. In your Strapi project, create a new file called `config/plugins.js` (if it doesn't already exist).

3. Add the following configuration to the `config/plugins.js` file:

```javascript
module.exports = ({ env }) => ({
  // Other plugins configuration

  email: {
    provider: 'novu',
    providerOptions: {
      novuApiKey: process.env.NOVU_API_KEY,
    },
    settings: {
      defaultFrom: 'your-email@your-domain.com',
      defaultReplyTo: 'your-email@your-domain.com',
    },
  },
});
```

Make sure to adjust `process.env.NOVU_API_KEY` with your preferred method of retrieving the Novu API key.

## Usage

Now you can use the default Strapi email methods (`strapi.plugins['email'].services.email.send()`) to send emails using Novu as the email provider. For example:

```javascript
await strapi.plugins['email'].services.email.send({
  to: [
    {
      subscriberId: '111',
      email: 'john.doe@domain.com',
      firstName: 'John',
      lastName: 'Doe',
    },
  ],
  from: 'your-email@your-domain.com',
  subject: 'Hello World',
  text: 'This is the text version of the email.',
  html: '<p>This is the HTML version of the email.</p>',
});
```

Make sure to adjust the values of `to`, `subscriberId`, `email`, `firstName`, `lastName`, `from`, `subject`, `text`, and `html` according to your specific use case.

## Custom Methods

You can interact with the Novu API via custom methods provided by the Novu SDK. The following custom methods are available:

### `addContactToList`

Adds a contact to a specific list.

### Usage example

```javascript
await strapi.plugins.email.provider
  .addContactToList({
    id: 'email@example.com',
    listId: 'mailingListId',
  })
  .catch((error) => console.log(error))
  .then((response) => console.log(response));
```

### `createContact`

Creates a new contact with the specified email and name.

### Usage example

```javascript
await strapi.plugins.email.provider
  .createContact({
    email: 'email@example.com',
    name: 'John Doe',
  })
  .catch((error) => console.log(error))
  .then((response) => console.log(response));
```

### `updateContact`

Updates an existing contact with the specified data.

### Usage example

```javascript
await strapi.plugins.email.provider
  .updateContact('contactId', {
    data: {
      customField: 'customValue',
    },
  })
  .catch((error) => console.log(error))
  .then((response) => console.log

(response));
```

### `createContactList`

Creates a new contact list with the specified name.

### Usage example

```javascript
await strapi.plugins.email.provider
  .createContactList({
    name: 'My Contact List',
  })
  .catch((error) => console.log(error))
  .then((response) => console.log(response));
```

### `removeContactFromList`

Removes a contact from a specific list.

### Usage example

```javascript
await strapi.plugins.email.provider
  .removeContactFromList({
    listId: 'mailingListId',
    id: 'contactId',
  })
  .catch((error) => console.log(error))
  .then((response) => console.log(response));
```

### `retrieveContact`

Retrieves information about a specific contact.

### Usage example

```javascript
await strapi.plugins.email.provider
  .retrieveContact('contactId')
  .catch((error) => console.log(error))
  .then((response) => console.log(response));
```

### `subscribeContactToList`

Subscribes an existing contact to a specific list.

### Usage example

```javascript
await strapi.plugins.email.provider
  .subscribeContactToList({
    listId: 'mailingListId',
    id: 'contactId',
  })
  .catch((error) => console.log(error))
  .then((response) => console.log(response));
```

### `unsubscribeContactFromList`

Unsubscribes a contact from a specific list.

### Usage example

```javascript
await strapi.plugins.email.provider
  .unsubscribeContactFromList({
    listId: 'mailingListId',
    id: 'contactId',
  })
  .catch((error) => console.log(error))
  .then((response) => console.log(response));
```

---

## Contributing

Feel free to contribute to this repository by submitting a pull request.

## License

This repository is [MIT licensed](LICENSE).

---

### Credits

Please note that the above README has been adapted from the `strapi-provider-email-mailjet` README to fit the Novu email provider.

Authors:
[Scott Agirs](https://github.com/scottagirs)

Initially published by [sboutet06](https://github.com/sboutet06)
