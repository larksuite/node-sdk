export const defaultCard = (variables: {
  title: string;
  content: string;
}) => {
  const { title, content } = variables;

  return JSON.stringify({
    "config": {
      "wide_screen_mode": true
    },
    "elements": [
      {
        "tag": "markdown",
        "content": content
      }
    ],
    "header": {
      "template": "blue",
      "title": {
        "content": title,
        "tag": "plain_text"
      }
    }
  })
}