import express from 'express';
import multer from 'multer';
import { tagError } from 'error-handler-module';
import { Dependencies } from '../routes.model';
import { badRequestError } from '../../utils/errorFactory';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const initRouter = ({ controller, validators }: Dependencies) => {
  const { verifyAuth } = validators;
  /**
   * POST /api/v1/files/
   * @summary Create a new file
   * @tags Files
   * @param {FileRequest} request.body.required - file request - multipart/form-data
   * @return {FileResponse} 201 - New file
   * @return 400 - Bad request
   * @return 401 - Unauthorized
   * @return 500 - Internal server error
   */
  router.post('/', verifyAuth, upload.single('file'), async (req, res, next) => {
    try {
      if (!req.file) throw badRequestError('File is required');
      const id = res.locals.id;
      const user = await controller.users.getUser(id);
      const newfile = await controller.files.saveFile(user.id, req.file.originalname, req.file.buffer);
      const response = { id: newfile };
      // TODO: response and request validator
      // validateResponse(response, req, 201);
      return res.status(201).json(response);
    } catch (error) {
      return next(tagError(error));
    }
  });

  /**
   * GET /api/v1/files/{id}
   * @summary Retrieve file
   * @tags Files
   * @return 302 - Redirect
   * @return 401 - Unauthorized
   * @return 404 - Not found
   * @return 500 - Internal server error
   */
  router.get('/:id', async (req, res, next) => {
    try {
      const id = res.locals.id;
      const user = await controller.users.getUser(id);
      const signedURL = await controller.files.getSignedURL(req.params.id);
      return res.redirect(signedURL);
    } catch (error) {
      return next(tagError(error));
    }
  });

  return router;
};

export default initRouter;
