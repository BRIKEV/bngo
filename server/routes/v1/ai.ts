import express from 'express';

import { tagError } from 'error-handler-module';
import { Dependencies } from '../routes.model';
import { badRequestError, forbiddenError } from '../../utils/errorFactory';

const router = express.Router();

const initRouter = ({ controller, validators }: Dependencies) => {
  const { verifyAuth, validateResponse, validateRequest } = validators;
  /**
   * POST /api/v1/ai/{recipeId}/conversation
   * @summary Return ai recipe coversation message for each user
   * @tags AI
   * @param {string} recipeId.path - recipeId
   * @param {AIConversationRequest} request.body.required - ai recipe prompt
   * @return {AIConversationResponse} 200 - AI recipe json response
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.post('/:recipeId/conversation', verifyAuth, validateRequest(), async (req, res, next) => {
    try {
      const id = res.locals.id;
      if (req.body.message.length > 2600) throw badRequestError('Message too long param');
      const usage = await controller.users.getAIUsage(id);
      if (usage.count === usage.limits.chat) {
        throw forbiddenError('Limit exceeded');
      }
      const [user, recipe] = await Promise.all([
        controller.users.getUser(id),
        controller.recipes.getRecipe(req.params.recipeId)
      ]);
      const response = await controller.ai.conversation(user.id, recipe.id, req.body.message);
      await controller.ai.saveAIUsage(user.id,
        recipe.title,
        recipe.servings,
        true,
        'CHAT',
      );
      validateResponse(response, req);
      return res.status(200).json(response);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * DELETE /api/v1/ai/{recipeId}/conversation
   * @summary Delete ai recipe conversation messages
   * @tags AI
   * @param {string} recipeId.path - recipeId
   * @return 200 - AI recipe json response
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.delete('/:recipeId/conversation', verifyAuth, async (req, res, next) => {
    try {
      const id = res.locals.id;
      const [user, recipe] = await Promise.all([
        controller.users.getUser(id),
        controller.recipes.getRecipe(req.params.recipeId)
      ]);
      await controller.ai.clearConversation(user.id, recipe.id);
      return res.sendStatus(200);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * POST /api/v1/ai/stream
   * @summary Return ai recipe
   * @tags AI
   * @param {AIRequest} request.body.required - ai recipe prompt
   * @return 200 - AI recipe stream response
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.post('/stream', verifyAuth, validateRequest(), async (req, res, next) => {
    try {
      const id = res.locals.id;
      const user = await controller.users.getUser(id);
      const usage = await controller.users.getAIUsage(id);
      if (usage.count === usage.limits.create) {
        throw forbiddenError('Limit exceeded');
      }
      const aiUsage = await controller.ai.saveAIUsage(user.id,
        req.body.title,
        req.body.servings,
        false,
        'CREATE_RECIPE',
      );
      const response = await controller.ai.generateAPIStreamResponse(
        user.id,
        req.body.title,
        req.body.servings,
      );
      const stream = response.data.pipe(res);
      stream.on('finish', async () => {
        await controller.ai.updateAIUsage(aiUsage, true);
      });
      return stream;
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * GET /api/v1/ai/recipes
   * @summary Retrieve user's Recipes
   * @tags AI
   * @param {title} search.query - search filter
   * @return {RecipeList[]} 200 - Recipe list data
   * @return 404 - Not found
   * @return 500 - Internal server error
   */
  router.get('/recipes', async (req, res, next) => {
    try {
      const searchFilter = req.query.search as string;
      if (!searchFilter) throw badRequestError('Missing search param');
      if (searchFilter.length > 100) throw badRequestError('Invalid search param');
      const matches = await controller.ai.searchVectors(searchFilter);
      if (matches.length === 0) return res.json([]);
      const vectorIds = matches.map(match => match.vectorId);
      const response = await controller.recipes.getVectorRecipes(vectorIds);
      validateResponse(response, req);
      return res.json(response);
    } catch (error) {
      return next(tagError(error));
    }
  });

  return router;
};

export default initRouter;
