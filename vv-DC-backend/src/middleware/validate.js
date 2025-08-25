import { validationResult } from 'express-validator';

export const validate = (schema) => {
 
  if (Array.isArray(schema)) {
    return [
      ...schema,
      (req, res, next) => {
        const result = validationResult(req);
        if (result.isEmpty()) return next();
        return res.status(400).json({
          message: 'Validation failed',
          errors: result.array().map(e => ({
            field: e.path || e.param,
            msg: e.msg,
          })),
        });
      },
    ];
  }


  return [
    (req, res, next) => {
      try {
        if (schema?.parse) {
          req.body = schema.parse(req.body);
        } else if (schema?.validateSync) {
          req.body = schema.validateSync(req.body, {
            abortEarly: false,
            stripUnknown: true,
          });
        } else {
          throw new Error('Unsupported schema type for validate()');
        }
        next();
      } catch (err) {
        const errors = err?.issues
          ? err.issues.map(i => ({ field: (i.path || []).join('.'), msg: i.message }))
          : [{ field: '', msg: err.message }];
        return res.status(400).json({ message: 'Validation failed', errors });
      }
    },
  ];
};

export const validateQuery = (schema) => {
 
  if (Array.isArray(schema)) {
    return [
      ...schema,
      (req, res, next) => {
        const result = validationResult(req);
        if (result.isEmpty()) return next();
        return res.status(400).json({
          message: 'Validation failed',
          errors: result.array().map(e => ({
            field: e.path || e.param,
            msg: e.msg,
          })),
        });
      },
    ];
  }

 
  return [
    (req, res, next) => {
      try {
        if (schema?.parse) {
          req.query = schema.parse(req.query);
        } else if (schema?.validateSync) {
          req.query = schema.validateSync(req.query, {
            abortEarly: false,
            stripUnknown: true,
          });
        } else {
          throw new Error('Unsupported schema type for validateQuery()');
        }
        next();
      } catch (err) {
        const errors = err?.issues
          ? err.issues.map(i => ({ field: (i.path || []).join('.'), msg: i.message }))
          : [{ field: '', msg: err.message }];
        return res.status(400).json({ message: 'Validation failed', errors });
      }
    },
  ];
};
