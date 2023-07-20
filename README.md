
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
    provider: 'strapi-provider-email-novu',
    providerOptions: {
      novuApiKey: env("NOVU_API_KEY"),
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

The `strapi-provider-email-novu` package provides the following methods:

### `send(options)`

Sends an email using Novu.

- `options`: An object containing the email parameters.
  - `to`: The recipient of the email. It can be an object with `subscriberId`, `email`, `firstName`, and `lastName` properties, or an array of recipient objects.
  - `from`: The sender's email address.
  - `fromName`: The sender's name.
  - `subject`: The subject of the email.
  - `text`: The plain text version of the email.
  - `html`: The HTML version of the email.
  - `eventName`: The trigger identifier of the Novu workflow.
  - `payload`: Additional custom information to pass to the Novu workflow. please refer to https://docs.novu.co/platform/workflows for more information

Example usage:

```javascript
await strapi.plugins['email'].services.email.send({
  to: {
    subscriberId: 'SUBSCRIBER_ID',
    email: 'recipient@example.com',
    firstName: 'John',
    lastName: 'Doe',
  },
  from: 'sender@example.com',
  fromName: 'Sender Name',
  subject: 'Hello from Novu',
  text: 'Plain text version of the email',
  html: '<p>HTML version of the email</p>',
  eventName: 'EVENT_NAME_FROM_ADMIN_PANEL',
  payload: {
    customVariables: 'VALUE_OR_OBJECT',
  },
});
```

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
