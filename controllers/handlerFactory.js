exports.deleteOne = (Model) => async (req, res) => {
  try {
    const tour = await Model.findByIdAndDelete(req.params.id);
    // console.log('heloo this is call ' + tour);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', messamge: err });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    // console.log('heloo this is call ' + tour);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', messamge: err });
  }
};
