import Doctor from '../models/Doctor.js';

export const getDoctors = async (req, res, next) => {
  try {

    const docs = await Doctor.find(/* filter */).select('fullName');
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

export const getDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doc);
  } catch (err) { next(err); }
};


export const createDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.create(req.body);
    res.status(201).json(doc);
  } catch (err) { next(err); }
};

export const updateDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doc);
  } catch (err) { next(err); }
};

export const deleteDoctor = async (req, res, next) => {
  try {
    const doc = await Doctor.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
