//Mailer will export something
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  //when there is a new keyword
  constructor({subject,recipients},content){
    super();

    this.sentgridApi = sendgrid(keys.emailSecretkey);
    this.from_email= new helper.Email('no-reply@email.com');
    this.subject = subject;
    this.body = new helper.Content('text/html',content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking(); //click tracking
    this.addRecipients();
    
  }
  formatAddresses(recipients){
    //object use{}
    return recipients.map(({email})=>{
      return new helper.Email(email);
    })
  }

  //template just write it
  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true,true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients(){
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient =>{
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send(){
    try{
      const request  = this.sentgridApi.emptyRequest({
      method:'POST',
      path:'/v3/mail/send',
      body:this.toJSON()
    });

    const response = await this.sentgridApi.API(request);
    return response;
    }
    catch(error){
    console.log('error',error.response);
    }
  }
}

module.exports = Mailer;

