'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');
const removeProperties = ['created_by', 'updated_by']

module.exports = {
  async find(ctx) {
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services.question.search(ctx.query);
    } else {
      entities = await strapi.services.question.find(ctx.query);
    }

    return entities.map(entity => {
      const question = sanitizeEntity(entity, {
        model: strapi.models.question,
      });

      removeProperties.forEach((property) => {
        if (question[property]) {
          delete question[property];
        }

        if (question.episode[property]) {
          delete question.episode[property];
        }
      })

      return question;
    });
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const question = await strapi.services.question.findOne({ id: id });
    removeProperties.forEach((property) => {
      if (question[property]) {
        delete question[property];
      }
    })
    return sanitizeEntity(question, { model: strapi.models.question });
  },
};
