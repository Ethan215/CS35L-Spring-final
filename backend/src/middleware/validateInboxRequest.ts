import { body, validationResult } from 'express-validator';

const validateInboxRequest = [
  body('subject').isString().notEmpty(),
  body('message').isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateInboxRequest;
