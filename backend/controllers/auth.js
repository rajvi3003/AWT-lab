const User = require('../models/user');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const ErrorHander = require('../utils/handler');

exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User({
    name,
    email,
    password
  });

  const emailToken = crypto.randomBytes(20).toString("hex");
  const emailVerificationUrl = `${process.env.FRONTEND_URL}/verify/email/${emailToken}`;
  const message = `Please Verify your email by clicking at this link :- \n\n ${emailVerificationUrl} \n\n.`;

    await sendEmail({
      email: user.email,
      subject: `SNC Account Verification`,
      message,
    });
   
  user.verifyEmailToken = emailToken;
  
  await user.save().then((s) => {
    res.status(200).json({
      success: true,
      message: `Email sent to ${s.email} successfully`,
   });
  })
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.verified) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
    }
    
    const token = user.getJWTToken();

    res.status(201).json({
    success: true,
    user,
    token,
  });
});




exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `SNC Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

   const token = user.getJWTToken();

    res.status(201).json({
    success: true,
    user,
    token,
    });
    
});


exports.verifyEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ verifyEmailToken: req.body.token });
  if (user) {
    user.verified = true;
    user.verifyEmailToken = undefined;
    await user.save({ validateBeforeSave: true });
    res.status(200).json({ success: true });
  } else {
    res.json({ error: "Not a valid Email Verification url" });
  }
});
