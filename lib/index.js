'use strict';

/* eslint-disable import/no-unresolved */
const { Novu } = require('@novu/node');
const { removeUndefined } = require('@strapi/utils');

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const novu = new Novu(providerOptions.novuApiKey);

    return {
      send: options => {
        return new Promise(async (resolve, reject) => {
          const { to, from, subject, text, html, eventName, payload, transactionId } = options;

          const novuPayload = {
            name: eventName,
            to: Array.isArray(to)
              ? to.map(recipient => ({
                subscriberId: recipient.subscriberId ?? recipient.email,
                email: recipient.email ?? null,
                firstName: recipient.firstName ?? null,
                lastName: recipient.lastName ?? null,
                phone: recipient.phone ?? null,
                data: {
                  subscriberType: recipient.subscriberId ? 'user' : 'guest'
                }
              }))
              : [
                {
                  subscriberId: to.subscriberId ?? to.email,
                  email: to.email ?? null,
                  firstName: to.firstName ?? null,
                  lastName: to.lastName ?? null,
                  data: {
                    subscriberType: to.subscriberId ? 'user' : 'guest'
                  }
                }
              ],
            payload: {
              subject: subject,
              ...payload
            },
            transactionId: transactionId ?? null
          };

          try {
            await novu.trigger(novuPayload);
            resolve();
          } catch (error) {
            console.error('Error sending email via Novu:', error);
            reject(error);
          }
        });
      },

      addContactToList: options => {
        return new Promise(async (resolve, reject) => {
          const { subscriberId, listId } = options;
          try {
            await novu.subscribers.addToList(subscriberId, listId);
            resolve();
          } catch (error) {
            console.error('Error adding contact to list in Novu:', error);
            reject(error);
          }
        });
      },

      removeContactFromList: options => {
        return new Promise(async (resolve, reject) => {
          const { subscriberId, listId } = options;
          try {
            await novu.subscribers.removeFromList(subscriberId, listId);
            resolve();
          } catch (error) {
            console.error('Error removing contact from list in Novu:', error);
            reject(error);
          }
        });
      },

      updateContact: (subscriberId, data) => {
        return new Promise(async (resolve, reject) => {
          try {
            await novu.subscribers.update(subscriberId, data);
            resolve();
          } catch (error) {
            console.error('Error updating contact in Novu:', error);
            reject(error);
          }
        });
      },

      deleteContact: subscriberId => {
        return new Promise(async (resolve, reject) => {
          try {
            await novu.subscribers.delete(subscriberId);
            resolve();
          } catch (error) {
            console.error('Error deleting contact in Novu:', error);
            reject(error);
          }
        });
      },

      getContact: subscriberId => {
        return new Promise(async (resolve, reject) => {
          try {
            const contact = await novu.subscribers.get(subscriberId);
            resolve(contact);
          } catch (error) {
            console.error('Error getting contact in Novu:', error);
            reject(error);
          }
        });
      },

      listContacts: (page = 0) => {
        return new Promise(async (resolve, reject) => {
          try {
            const contacts = await novu.subscribers.list(page);
            resolve(contacts);
          } catch (error) {
            console.error('Error listing contacts in Novu:', error);
            reject(error);
          }
        });
      },

      setChannelCredentials: (subscriberId, providerId, credentials) => {
        return new Promise(async (resolve, reject) => {
          try {
            await novu.subscribers.setCredentials(subscriberId, providerId, credentials);
            resolve();
          } catch (error) {
            console.error('Error setting channel credentials in Novu:', error);
            reject(error);
          }
        });
      }
    };
  }
};
