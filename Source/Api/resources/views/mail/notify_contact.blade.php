<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>

<div>
    <p>Dear {!! $academyName !!},</p>
    <p>You have had a new enquiry from the WMF Website. Please see details below:</p>>
    <p>NAME: {!! $name !!}</p>
    <p>ACADEMY CONTACTED FROM: {!! $academyName !!}</p>
    <p>EMAIL: {!! $customerEmail !!}</p>
    <p>TELEPHONE NUMBER: {!! $phone !!}</p>
    <p>NATURE OF ENQUIRY: {!! $nature !!}</p>

    <p>MESSAGE: {!! $customerMessage !!}</p>

    <hr/>
    <p>
    The customer has been automatically emailed confirming receipt of their message. Within this email they have been advised that someone will be in contact with them in the next 24 hours. Therefore, please respond to this enquiry within 24 hours.</p>
    <p>Kind regards,</p>
    <p>We Make Footballers</p>
</div>
</body>
</html>
