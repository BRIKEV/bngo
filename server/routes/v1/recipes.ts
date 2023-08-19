import express from 'express';
import { tagError } from 'error-handler-module';
import { Dependencies } from '../routes.model';
import logger from '../../utils/logger';
import { getFilters } from '../utils';

const router = express.Router();

const initRouter = ({ controller, validators }: Dependencies) => {
  const { validateRequest, validateResponse, verifyAuth } = validators;
  /**
   * POST /api/v1/recipes/
   * @summary Create a new recipe
   * @tags Recipes
   * @param {RecipeRequest} request.body.required - new recipes request
   * @return {RecipeResponse} 201 - New recipe
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.post('/', verifyAuth, validateRequest(), async (req, res, next) => {
    try {
      const id = res.locals.id as string;
      const user = await controller.users.getUser(id);
      logger.info(`User ${id} creating recipe`);
      const newRecipe = await controller.recipes.createRecipe(user.id, req.body);
      logger.info(`User ${id} create recipe ${newRecipe.id}`);
      validateResponse(newRecipe, req, 201);
      return res.status(201).json(newRecipe);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * PUT /api/v1/recipes/{id}
   * @summary Update a recipe
   * @tags Recipes
   * @param {string} id.path - recipeId
   * @param {RecipeUpdateRequest} request.body.required - recipe update payload
   * @return {RecipeResponse} 200 - Recipe updated
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.put('/:id', verifyAuth, validateRequest(), async (req, res, next) => {
    try {
      const id = res.locals.id as string;
      const user = await controller.users.getUser(id);
      logger.info(`User ${id} updating recipe`);
      const newRecipe = await controller.recipes.updateRecipe(req.params.id, user.id, req.body);
      logger.info(`User ${id} creating recipe ${newRecipe.id}`);
      validateResponse(newRecipe, req);
      return res.status(200).json(newRecipe);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * PUT /api/v1/recipes/{id}/image
   * @summary Update recipe image
   * @tags Recipes
   * @param {string} id.path - recipeId
   * @param {RecipePreviewImageRequest} request.body.required - recipe update payload
   * @return 202 - Accepted
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.put('/:id/image', verifyAuth, validateRequest(), async (req, res, next) => {
    try {
      const id = res.locals.id as string;
      const user = await controller.users.getUser(id);
      logger.info(`User ${id} updating recipe image`);
      await controller.recipes.updatePreviewImage(user.id, req.params.id, req.body.image);
      logger.info(`User ${id} creating recipe image`);
      return res.sendStatus(202);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * GET /api/v1/recipes/
   * @summary Retrieve user's Recipes
   * @tags Recipes
   * @param {number} size.query - size to paginate
   * @param {number} page.query - page you want to retrieve
   * @param {title} search.query - search filter
   * @param {number} servings.query - serving filter
   * @param {number} time.query - time filter
   * @return {RecipesResponse} 200 - Recipe list data
   * @return 401 - Unauthorized
   * @return 404 - Not found
   * @return 500 - Internal server error
   */
  router.get('/', async (req, res, next) => {
    try {
      const filters = getFilters(req);
      const recipes = await controller.recipes.findAll(filters);
      const pages = Math.ceil(recipes.count / filters.size);
      const response = {
        docs: recipes.recipes,
        total: recipes.count,
        size: filters.size,
        page: filters.page,
        pages,
      };
      validateResponse(response, req);
      return res.json(response);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * GET /api/v1/recipes/{id}
   * @summary Retrieve a recipe
   * @tags Recipes
   * @param {string} id.path - recipeId
   * @return {RecipeResponse} 200 - Recipe
   * @return 401 - Unauthorized
   * @return 404 - Not found
   * @return 500 - Internal server error
   */
  router.get('/:id', async (req, res, next) => {
    try {
      const recipe = await controller.recipes.getRecipe(req.params.id);
      validateResponse(recipe, req);
      return res.json(recipe);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * DELETE /api/v1/recipes/{id}
   * @summary Delete a recipe
   * @tags Recipes
   * @param {string} id.path - recipeId
   * @return 202 - Accepted
   * @return 401 - Unauthorized
   * @return 404 - Not found
   * @return 500 - Internal server error
   */
  router.delete('/:id', verifyAuth, async (req, res, next) => {
    try {
      const id = res.locals.id;
      const user = await controller.users.getUser(id);
      await controller.recipes.deleteRecipe(user.id, req.params.id);
      return res.sendStatus(202);
    } catch (error) {
      return next(tagError(error));
    }
  });

  return router;
};

export default initRouter;
