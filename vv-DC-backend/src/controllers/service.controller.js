
import Service from '../models/Service.js';

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find().select('title'); 
    res.json(services);
  } catch (err) {
    next(err);
  }
};


export const getServiceBySlug = async (req, res, next) => {
  try {
    const doc = await Service.findOne({ slug: req.params.slug });
    if (!doc) return res.status(404).json({ message: 'Service not found' });
    res.json(doc);
  } catch (err) { next(err); }
};

export const createService = async (req, res, next) => {
  try {
    const doc = await Service.create(req.body);
    res.status(201).json(doc);
  } catch (err) { next(err); }
};

export const updateService = async (req, res, next) => {
  try {
    const doc = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Service not found' });
    res.json(doc);
  } catch (err) { next(err); }
};

export const deleteService = async (req, res, next) => {
  try {
    const doc = await Service.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

export const getService = async (req, res, next) => {
  try {
    const doc = await Service.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Service not found' });
    res.json(doc);
  } catch (err) { next(err); }
};
