'use strict';

/* eslint-disable import/no-unresolved */
const { Novu } = require('@novu/node');
const { removeUndefined } = require('@strapi/utils');
const  validator = require('validator');

function validateFields(options, reject){//ToDo migrate to Typescript for type safety
  const {
    to,
    from,
    subject,
    text,
    data,
    html,
    eventName,
    payload,
    transactionId
  } = options;

  if(!to){
    const error = new Error("recpient is missing")
    console.error(options)
    reject(error)
  }

}
function formatMessage(options, settings, reject){
  const {
    to,
    from,
    subject,
    text,
    data,
    html,
    eventName,
    payload,
    transactionId
  } = options;

  //console.log("formatting email...", options)

  const params = {
    to: null,
    payload: {
      subject: subject ?? null,
      text: text,
      data: data ?? null,
      html: html ?? null,
      ...payload
    },
    transactionId: transactionId ?? null
  }
  let kind = null

  if(Array.isArray(to)){
    params.to = to.map(recipient => ({
      subscriberId: recipient.subscriberId ?? recipient.email,
      email: recipient.email ?? null,
      firstName: recipient.firstName ?? null,
      lastName: recipient.lastName ?? null,
      phone: recipient.phone ?? null,
      data: {
        subscriberType: recipient.subscriberId ? 'user' : 'guest'
      }
    }))
    kind = "array"
  }

  if(!kind && typeof to === "object") {
    params.to = {
      subscriberId: to.subscriberId ?? to.email,
      email: to.email ?? null,
      firstName: to.firstName ?? null,
      lastName: to.lastName ?? null,
      data: {
        subscriberType: to.subscriberId ? 'user' : 'guest'
      }
    }
    kind = "object"
  }

  if(!kind && validator.isEmail(to)) {//Todo: try to retrieve user by email in Novu
    params.to = {
      subscriberId: to, //if user exist replace to by id
      email: to,
      firstName: null,
      lastName: null,
      data: {
        subscriberType: 'guest'
      }
    }
    kind = "email"
  }

  if(!kind && typeof Number(to) === "number" && isFinite(to)) {//Todo: check if user Id exist in Novu, warning: for bulk sending ignore user verification !
    params.to = {
      subscriberId: to,
      email: null,
      firstName: null,
      lastName: null,
      data: {
        subscriberType: 'user'
      }
    }
    kind = "id"
  }
  if(!kind){
    const error = new Error("recipient format is invalid !")
    console.error(options)
    reject(error)
  }
  return params
}

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const novu = new Novu(providerOptions.novuApiKey);

    return {
      send: options => {
        return new Promise(async (resolve, reject) => {
          validateFields(options, reject)
          const novuPayload = formatMessage(options, settings, reject);
          //console.log(novuPayload)
          try {
            await novu.trigger(options.eventName ?? "email_strapi", novuPayload);
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
