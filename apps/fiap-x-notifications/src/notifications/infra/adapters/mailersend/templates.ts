export const SuccessMailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificação de Processamento</title>
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
            <h1>Notificação de Processamento</h1>
        </div>
        <div class="content">
            <p>Caro {{customerName}},</p>
            <p>Estamos felizes em informá-lo que o processamento de seu vídeo foi concluído com sucesso.</p>
            <p><strong>Identificador do Vídio:</strong> {{videoId}}</p>
            <p><strong>Nome do arquivo:</strong> {{filename}}</p>
            <a href="{{downloadSignedUrl}}"><strong>Baixar agora</strong></a>
            <p>Obrigado por escohler os nossos serviços. Se tiver alguma dúvida ou precisar de qualquer assistência sinta-se bem vindo para nos contatar.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Fiap X Inc. Todos os direitos reservados.</p>
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
    <title>Notificação de Processamento</title>
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
            <h1>Notificação de Processamento</h1>
        </div>
        <div class="content">
            <p>Caro {{customerName}},</p>
            <p>Sentimos muito em informar que o processamento de seu vídeo não pode ser concluído.</p>
            <p><strong>Identificador do Vídio:</strong> {{videoId}}</p>
            <p><strong>Nome do arquivo:</strong> {{filename}}</p>
            <p>Obrigado por escohler os nossos serviços. Se tiver alguma dúvida ou precisar de qualquer assistência sinta-se bem vindo para nos contatar.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Fiap X Inc. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
