const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message('hello', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  say({
    blocks: [
      {
        "type": "section",
        "response_type": "ephemeral",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        }
      }
    ]
  });
});



// The echo command simply echoes on command
app.command('/lark', async ({ command, ack, say }) => {
  // Acknowledge command request
  ack();

  // say() sends a message to the channel where the event was triggered
  say({
    blocks: [
      {
        "type": "section",
        "response_type": "ephemeral",
        "text": {
          "type": "mrkdwn",
          "text": `You said <@${command.text}>!`
        }
      }
    ]
  });
});



app.action('button_click', ({ body, ack, say }) => {
  // Acknowledge the action
  ack();
  say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
