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
      entities = await strapi.services.episode.search(ctx.query);
    } else {
      entities = await strapi.services.episode.find(ctx.query);
    }

    return entities.map(entity => {
      const episode = sanitizeEntity(entity, {
        model: strapi.models.episode,
      });
      removeProperties.forEach((property) => {
        if (episode[property]) {
          delete episode[property];
        }
      })
      return episode;
    });
  },

  async findOne(ctx) {
    const { number } = ctx.params;

    const episode = await strapi.services.episode.findOne({ number: number });
    removeProperties.forEach((property) => {
      if (episode[property]) {
        delete episode[property];
      }
    })
    return sanitizeEntity(episode, { model: strapi.models.episode });
  },
};
