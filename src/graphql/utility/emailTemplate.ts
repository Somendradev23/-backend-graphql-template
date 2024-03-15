export function changePasswordTemplate(fullName: any, token: any) {
  return `
    <!doctype html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <style>
        .main-content {
            width: 100%;
            height: 100%;
            margin: 15px;
        }
        .reset-button {
            background-color: #0277B6;
            color: white;
            border: none;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin-top: 10px;
            cursor: pointer;
        }
      </style>
    </head>
    <body style="font-family: 'Trebuchet MS', sans-serif; font-size: 12px !important;">
      <div class="main-content">
        <h4 style="color: #0277B6; text-transform: uppercase;">HI ${fullName},</h4>
        <strong>
          <p>We have received your request to reset your password.</p>
          <p>Please click the button to change your pasword </p>
          <a href=http://localhost:4000/user/reset-password/${token} class="reset-button">Change Password</a>
        </strong>
        <br>
        <br>
        <h4 style="color: #0277B6;">ANY QUESTIONS? EMAIL US: <a style="color: #B1F48E; font-weight: normal;" href="mailto: test@devtrust.biz">test@devtrust.biz</a></h4>
        <br>
      </div>
    </body>
    </html>
  `;
}
