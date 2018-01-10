const keys = require('../../config/keys');

module.exports = survey =>{
  //handle mutiline html use``
  return `
  <html>
    <body>
     <div style = "text-align:center;">
      <h3>This is a email send by pizzie</h3>
      <p> Please answer the following questions:</p>
      <p>${survey.body}</p>
      <div>
         <a href = "${keys.domain}/api/surveys/${survey.id}/yes"> Yes </a>
      </div>
      <div>
         <a href = "${keys.domain}/api/surveys/${survey.id}/no"> No </a>
      </div>
     </div>
    </body>
  </html>          
  `

};