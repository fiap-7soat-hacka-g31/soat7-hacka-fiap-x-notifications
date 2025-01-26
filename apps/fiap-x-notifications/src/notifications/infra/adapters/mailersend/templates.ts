export const SuccessMailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Processing Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            font-size: 24px;
            color: #007BFF;
        }
        .content {
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Video Processing Notification</h1>
        </div>
        <div class="content">
            <p>Dear {{customerName}},</p>
            <p>We are pleased to inform you that the processing of your video has been completed with success.</p>
            <p><strong>Video Id:</strong> {{videoId}}</p>
            <p><strong>Filename:</strong> {{filename}}</p>
            <a href="{{downloadSignedUrl}}"><strong>Download Here</strong></a>
            <p>Thank you for choosing our service. If you have any questions or need further assistance, feel free to contact us.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Fiap X Inc. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const FailureMailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Processing Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            font-size: 24px;
            color: #007BFF;
        }
        .content {
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Video Processing Notification</h1>
        </div>
        <div class="content">
            <p>Dear {{customerName}},</p>
            <p>We are sorry to inform you that the processing of your video could not be completed.</p>
            <p><strong>Video Id:</strong> {{videoId}}</p>
            <p><strong>Filename:</strong> {{filename}}</p>
            <p>Thank you for choosing our service. Feel free to contact us for further assistance.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Fiap X Inc. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
