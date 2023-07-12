# Feishu open interface SDK

[中文](https://github.com/larksuite/node-sdk/blob/main/README.zh.md)
## Overview
[Feishu Open Platform](https://open.feishu.cn/document/ukTMukTMukTM/uITNz4iM1MjLyUzM) provides a series of atomic APIs on the server side to realize diversified functions, but the actual coding process is not very smooth: when using these APIs to complete operation, a lot of extra work needs to be considered, such as token acquisition and maintenance, data encryption and decryption, request signature verification, etc.; in the actual coding process, the semantics of function calls are missing, cause mental burden.

All of these make the overall development experience poor. In order to make the open capability easy to use, we have written this SDK, which integrates all the verbose logic into built-in processing, provides a complete type hints, and provides external semantics. Programming interface to improve coding experience. 

Here are some official tutorials based on the sdk:
* [Quickly develop interactive cards](https://open.feishu.cn/document/home/quickly-develop-interactive-cards/introduction)
* [Quick Start of Personnel and Attendance Management System](https://open.feishu.cn/document/home/quick-start-of-personnel-and-attendance-management-system/overview)
* [Quick access to Base](https://open.feishu.cn/document/home/quick-access-to-base/preparation)
* [Department personnel management based on web app](https://open.feishu.cn/document/home/quick-access-to-base/department-personnel-management-based-on-web-app/overview)
* [Quick access to Contact API](https://open.feishu.cn/document/home/quick-access-to-contact-api/introduction)
* [Automatic attendance management based on approval](https://open.feishu.cn/document/home/automatic-attendance-management-based-on-approval/introduction)

## Concept
- Development documentation: A reference to the open interface of the open platform, **a must-see for developers, you can use the search function to query documents efficiently**. [More introduction instructions](https://open.feishu.cn/document/) .

- Developer background: The management background of the developer's development application, [more introduction](https://open.feishu.cn/app/).

- Enterprise self-built Application: The application can only be installed and used within the enterprise, [more introduction](https://open.feishu.cn/document/uQjL04CN/ukzM04SOzQjL5MDN).

- ISV Application: The app will be listed in the [ISV Application](https://app.feishu.cn/?lang=zh-CN)
  Display, each enterprise can choose to install, [more introduction instructions](https://open.feishu.cn/document/uQjL04CN/ugTO5UjL4kTO14CO5kTN).

## Installation
npm
```shell script
npm install @larksuiteoapi/node-sdk
````
yarn
````
yarn add @larksuiteoapi/node-sdk
````

## How to use
Provides two versions of ECMAScript and CommonJS, and supports the use of native Javascript and Typescript. The examples are all taking Typescript as an example.

Typescript
```typescript
import * as lark from '@larksuiteoapi/node-sdk';
````
CommonJS
````javascript
const lark = require('@larksuiteoapi/node-sdk');
````
ECMAScript
````javascript
import * as lark from '@larksuiteoapi/node-sdk';
````
### API Call
The list of all APIs on Feishu Open Platform: [click here](https://open.feishu.cn/document/ukTMukTMukTM/uYTM5UjL2ETO14iNxkTN/server-api-list).

The SDK provides a semantic calling method. You only need to construct a client instance according to the relevant parameters, and then use the semantic method (*client.business domain.resource.method*) on it to complete the API call, the calling process and the calling result. There are complete types for prompting, such as sending a message to a group chat:
```typescript
import * as lark from '@larksuiteoapi/node-sdk';

const client = new lark. Client({
    appId: 'app id',
    appSecret: 'app secret',
    appType: lark.AppType.SelfBuild,
    domain: lark.Domain.Feishu,
});

const res = await client.im.message.create({
    params: {
        receive_id_type: 'chat_id',
    },
    data: {
        receive_id: 'receive_id',
        content: JSON.stringify({text: 'hello world'}),
        msg_type: 'text',
  },
});
````
> tips: 
> * If you want to debug an API, you can click the link in the comment to enter the API debugging platform for debugging:
> ![](doc/debugger-tip.png)
> * How to obtain the semantic call interface：[Click here](https://github.com/larksuite/node-sdk/issues/42)

#### Create Client
For self-built applications, you can use the following code to create a client:

```typescript
import * as lark from '@larksuiteoapi/node-sdk';

const client = new lark. Client({
    appId: 'app id',
    appSecret: 'app secret'
});
````

For store apps, the specified appType that needs to be displayed is lark.AppType.ISV:
```typescript
import * as lark from '@larksuiteoapi/node-sdk';

const client = new lark.Client({
    appId: 'app id',
    appSecret: 'app secret',
    appType: lark.AppType.ISV,
});
````
**When using the client of the created store application to initiate an API call, you need to manually pass the [tenant_key](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/g#d15ab5d)**, you can Use `lark.withTenantKey` to do it:
```typescript
client.im.message.create({
    params: {
        receive_id_type: 'chat_id',
    },
    data: {
        receive_id: 'chat_id',
        content: JSON.stringify({text: 'hello world'}),
        msg_type: 'text'
    },
}, lark.withTenantKey('tenant key'));
````

#### `Client` construction parameters:
| Parameter | Description | Type | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
| appId | app id | string | yes | - |
| appSecret | app secret | string | yes | - |
| domain | The domain of the application, divided into Feishu (https://open.feishu.cn), lark (https://open.larksuite.com), others (the complete domain name needs to be passed) | Domain &#124; string | no | Domain.Feishu |
| httpInstance | The http instance of the sdk sending request。*By default, the sdk uses axios.create() to construct a defaultHttpInstance to make http calls.* | HttpInstance | No | defaultHttpInstance。*It can be imported from sdk and add interceptors on it.* |
| loggerLevel | Log Level | LoggerLevel | No | info |
| logger | - | Logger | No | - |
| cache | Cache | Cache | No | - |
| disableTokenCache | Whether to disable the cache, if disabled, the token will not be cached, and it will be re-pulled every time it needs to be used | boolean | No | false |
| appType | The type of application, divided into store application or self-built application | AppType | No | AppType.SelfBuild |
| helpDeskId | helpdesk id | string | no | - |
| helpDeskToken | helpdesk token | string | no | - |

#### Pagination
For the interface whose return value is presented in the form of pagination, it provides iterator encapsulation (the method name suffix is ​​WithIterator), which improves the usability and eliminates the tedious operation of repeatedly obtaining data according to page_token, such as obtaining the user list:
``` typescript
// Process 20 pieces of data each time
for await (const items of await client.contact.user.listWithIterator({
    params: {
        department_id: '0',
        page_size: 20,
    },
})) {
    console.log(items);
}

// You can also use next to manually control the iteration, fetching 20 pieces of data each time
const listIterator = await SDKClient.contact.user.listWithIterator({
    params: {
        department_id: '0',
        page_size: 20,
    },
});
const { value } = await listIterator[Symbol.asyncIterator]().next();
console.log(value);
````
* Of course, you can also use the version without iterator encapsulation. In this case, you need to manually perform paging calls each time according to the returned page_token. *
#### File upload
In the same way as calling ordinary API, you can pass the parameters according to the type prompt, and the processing of file upload is encapsulated inside, such as:
```typescript
const res = await client.im.file.create({
    data: {
        file_type: 'mp4',
        file_name: 'test.mp4',
        file: fs.readFileSync('file path'),
    },
});
````
#### File download
The returned binary stream is encapsulated, eliminating the processing of the stream itself, just call the writeFile method to write the data to the file, such as:
```typescript
const resp = await client.im.file.get({
    path: {
        file_key: 'file key',
    },
});
await resp.writeFile(`filepath.suffix`);
````

#### Normal call
Some old versions of the open interface cannot generate corresponding semantic calling methods, and you need to use the request method on the client to make manual calls:
```typescript
import * as lark from '@larksuiteoapi/node-sdk';

const client = new lark. Client({
    appId: 'app id',
    appSecret: 'app secret',
    appType: lark.AppType.SelfBuild,
    domain: lark.Domain.Feishu,
});

const res = await client. request({
    method: 'POST',
    url: 'xxx',
    data: {},
    params: {},
});
````
#### Message Card
When sending [message card](https://open.feishu.cn/document/ukTMukTMukTM/uczM3QjL3MzN04yNzcDN)， it will first be in the [message card builder](https://open.feishu.cn/document/ukTMukTMukTM/uYzM3QjL2MzN04iNzcDN/message-card-builder) to build a message card template, get the generated template json, replace the content-related parts with data, and use the result as a parameter to support the message card api. Such as sending a simple message card with `title` and `content`:
```typescript
client.im.message.create({
  params: {
    receive_id_type: 'chat_id',
  },
  data: {
    receive_id: 'your receive_id',
    content: JSON.stringify({
        "config": {
          "wide_screen_mode": true
        },
        "elements": [
          {
            "tag": "markdown",
            "content": "Card Content"
          }
        ],
        "header": {
          "template": "blue",
          "title": {
            "content": "Card Title",
            "tag": "plain_text"
          }
        }
      }
    ),
    msg_type: 'interactive'
  }
})
```
![](doc/msg-card.png)
There will be a problem: **If the content of the message card is relatively rich, the generated template json is relatively large, and there will be more content that needs to be filled with data, and manual maintenance is more cumbersome**. To solve this problem, The Open-Platform provides the ability of [Template Message](https://open.feishu.cn/document/tools-and-resources/message-card-builder#3e1f2c7c).When sending a message card, you only need to provide the template id and the data content of the template. The sdk encapsulates this ability in terms of calling, and the interface that supports message cards will synchronously add a ByCard calling method, only need to pass `template_id` and `template_variable`. The above call can be rewritten as:
```typescript
client.im.message.createByCard({
  params: {
    receive_id_type: 'chat_id',
  },
  data: {
    receive_id: 'your receive_id',
    template_id: 'your template_id',
    template_variable: {
      content: "Card Content",
      title: "Card Title"
    }
  }
});
```
If you want to quickly experience Message Card, you can use a basic card built into the sdk:
```typescript
import * as lark from '@larksuiteoapi/node-sdk';

client.im.message.create({
  params: {
    receive_id_type: 'chat_id',
  },
  data: {
    receive_id: 'your receive_id',
    content: lark.messageCard.defaultCard({
      title: 'Card Title',
      content: 'Card Content'
    }),
    msg_type: 'interactive'
  }
})
```
![](doc/msg-card.png)

#### Configure request options
If you want to modify the parameters of the request during the API call, such as carrying some headers, custom tenantToken, etc., you can use the second parameter of the request method to modify:
```typescript
await client.im.message.create({
    params: {
        receive_id_type: 'chat_id',
    },
    data: {
        receive_id: 'receive_id',
        content: JSON.stringify({text: 'hello world'}),
        msg_type: 'text',
    },
}, {
    headers: {
        customizedHeaderKey: 'customizedHeaderValue'
    }
});
````
The SDK also encapsulates commonly used modification operations into methods, which can be used:

| Method | Description |
| ---- | ---- |
| withTenantKey | Set tenant key |
| withTenantToken | Set tenant token |
| withHelpDeskCredential | Whether to bring in the [Service Desk token](https://open.feishu.cn/document/ukTMukTMukTM/ugDOyYjL4gjM24CO4IjN) |
| withUserAccessToken | Set access token |
| withAll | Combines the results of the above methods |

```typescript
await client.im.message.create({
    params: {
        receive_id_type: 'chat_id',
    },
    data: {
        receive_id: 'receive_id',
        content: JSON.stringify({text: 'hello world'}),
        msg_type: 'text',
    },
}, lark.withTenantToken('tenant token'));

await client.im.message.create({
    params: {
        receive_id_type: 'chat_id',
    },
    data: {
        receive_id: 'receive_id',
        content: JSON.stringify({text: 'hello world'}),
        msg_type: 'text',
    },
}, lark.withAll([
  lark.withTenantToken('tenant token'),
  lark.withTenantKey('tenant key')
]));
````

### Events handling
For a list of all events opened on Feishu Open Platform, please click [here](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list).

For the event processing scenario, we care about is only what kind of events to listen for, and what we do after the event occurs. other work such as data decryption we don't want to care about. The SDK provides an intuitive way to describe this part of the logic:
1. Construct an instance of the event handler `EventDispatcher`;
2. Register the events to be monitored and their handler functions on the instance;
3. Bind the instance to the service;

`EventDispatcher` will perform operations such as data decryption internally. If no relevant parameters are passed, it will be automatically ignored.
```typescript
import http from 'http';
import * as lark from '@larksuiteoapi/node-sdk';

const eventDispatcher = new lark.EventDispatcher({
    encryptKey: 'encrypt key'
}).register({
    'im.message.receive_v1': async (data) => {
        const chatId = data.message.chat_id;

        const res = await client.im.message.create({
            params: {
                receive_id_type: 'chat_id',
            },
            data: {
                receive_id: chatId,
                content: JSON.stringify({text: 'hello world'}),
                msg_type: 'text'
            },
        });
        return res;
    }
});

const server = http.createServer();
server.on('request', lark.adaptDefault('/webhook/event', eventDispatcher));
server.listen(3000);
````

#### `EventDispatcher` constructor parameters

| Parameter | Description | Type | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
| [encryptKey](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/encrypt-key-encryption-configuration-case) | Push data encryption key, required when enabling encrypted push use for data decryption | string | no | - |
| loggerLevel | log level | LoggerLevel | no | lark.LoggerLevel.info |
| logger | - | Logger | No | - |
| cache | Cache | Cache | No | - |

> Note: Some events are v1.0 version and are no longer maintained. The SDK retains support for them. It is strongly recommended to use new versions of events that are consistent with their functions. Move the mouse to the corresponding event subscription function to see the relevant documents:
![](doc/deprecated.png)

#### Combined with express
The SDK provides an adapter for experss to convert eventDispatcher into express middleware, which can be seamlessly combined with services written using express (*The use of bodyParser in the example is not necessary, but the community mostly uses it to format body data*):
```typescript
import * as lark from '@larksuiteoapi/node-sdk';
import express from 'express';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

const eventDispatcher = new lark.EventDispatcher({
    encryptKey: 'encryptKey',
}).register({
    'im.message.receive_v1': async (data) => {
        const chatId = data.message.chat_id;

        const res = await client.im.message.create({
            params: {
                receive_id_type: 'chat_id',
            },
            data: {
                receive_id: chatId,
                content: JSON.stringify({text: 'hello world'}),
                msg_type: 'text'
            },
        });
        return res;
    }
});

server.use('/webhook/event', lark.adaptExpress(eventDispatcher));
server.listen(3000);
````
#### Combined with Koa
The SDK provides an adapter for Koa to convert eventDispatcher into Koa middleware, which can be seamlessly combined with services written using Koa (*The use of koa-body in the example is not necessary, but the community mostly uses it to format body data*):
```typescript
import * as lark from '@larksuiteoapi/node-sdk';
import Koa from 'koa';
import koaBody from 'koa-body';

const server = new Koa();
server.use(koaBody());

const eventDispatcher = new lark.EventDispatcher({
    encryptKey: 'encryptKey',
}).register({
    'im.message.receive_v1': async (data) => {
        const open_chat_id = data.message.chat_id;

        const res = await client.im.message.create({
            params: {
                receive_id_type: 'chat_id',
            },
            data: {
                receive_id: open_chat_id,
                content: JSON.stringify({text: 'hello world'}),
                msg_type: 'text'
            },
        });

        return res;
    },
});

server.use(nodeSdk.adaptKoa('/webhook/event', eventDispatcher));
server.listen(3000);
````
#### Combined with koa-router
When using Koa to write services, in most cases, koa-router is used to process routing, so the SDK also provides adaptations for this situation:
```typescript
import * as nodeSdk from '@larksuiteoapi/node-sdk';
import Koa from 'koa';
import Router from '@koa/router';
import koaBody from 'koa-body';

const server = new Koa();
const router = new Router();
server.use(koaBody());

const eventDispatcher = new lark.EventDispatcher({
    encryptKey: 'encryptKey',
}).register({
    'im.message.receive_v1': async (data) => {
        const open_chat_id = data.message.chat_id;

        const res = await client.im.message.create({
            params: {
                receive_id_type: 'chat_id',
            },
            data: {
                receive_id: open_chat_id,
                content: JSON.stringify({text: 'hello world'}),
                msg_type: 'text'
            },
        });

        return res;
    },
});

router.post('/webhook/event', lark.adaptKoaRouter(eventDispatcher));
server.use(router.routes());
server.listen(3000);
````
#### Custom adapter
If you want to adapt to services written by other libraries, you currently need to encapsulate the corresponding adapter yourself. Pass the received event data to the invoke method of the instantiated `eventDispatcher` for event processing:

```typescript
const data = server.getData();
const result = await dispatcher.invoke(data);
server.sendResult(result);
````

#### Challenge check
When configuring the event request address, The Open Platform will push a POST request in `application/json` format to the request address. The POST request is used to verify the validity of the configured request address, and the request body will carry a `challenge` field , **The application needs to return the received challenge value to the Open Platform within 1 second**. See: [ Document](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case)

The adapter provided by the sdk above encapsulates the verification logic. Set the `autoChallenge` field in the options parameter to true to enable:
```typescript
// adaptDefault
lark.adaptDefault('/webhook/event', eventDispatcher, {
    autoChallenge: true,
});
// express
lark.adaptExpress(eventDispatcher, {
    autoChallenge: true,
});
// koa
lark.adaptKoa('/webhook/event', eventDispatcher, {
    autoChallenge: true,
});
// koa-router
router.post(
    '/webhook/event',
    lark.adaptKoaRouter(eventDispatcher, {
        autoChallenge: true,
    })
);
```

### [Message Card](https://open.feishu.cn/document/ukTMukTMukTM/uczM3QjL3MzN04yNzcDN)

The processing of the Message Card is also a kind of Event processing. The only difference between the two is that the processor of the Message Card is used to respond to the events generated by the interaction between the user and the Message Card. If the processor has a return value (*the value structure should be in line with the structure defined by [Message Card Structure](https://open.feishu.cn/document/ukTMukTMukTM/uEjNwUjLxYDM14SM2ATN)*), then the return value is used to update the responded message card:

```typescript
import http from 'http';
import * as lark from '@larksuiteoapi/node-sdk';
import type { InteractiveCardActionEvent, InteractiveCard } from '@larksuiteoapi/node-sdk';

const cardDispatcher = new lark.CardActionHandler(
    {
      encryptKey: 'encrypt key',
      verificationToken: 'verification token'
    },
    async (data: InteractiveCardActionEvent) => {
        console.log(data);
        const newCard: InteractiveCard = {
          // your new interactive card content
          header: {},
          elements: []
        };
        return newCard;
    }
);

const server = http.createServer();
server.on('request', lark.adaptDefault('/webhook/card', cardDispatcher));
server.listen(3000);
````

#### `CardActionHandler` construction parameters

| Parameter | Description | Type | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
| [encryptKey](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/encrypt-key-encryption-configuration-case) | Push data encryption key, required when enabling encrypted push use for data decryption | string | no | - |
| [verificationToken](https://open.feishu.cn/document/ukTMukTMukTM/uYzMxEjL2MTMx4iNzETM) | Security verification, it needs to be used when enabling message security verification | string | No | - |
| loggerLevel | Log Level | LoggerLevel | No | LoggerLevel.info |
| logger | - | Logger | No | - |
| cache | Cache | Cache | No | - |

### Tool method
#### AESCipher
Decrypt. If [Encrypted Push](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/encrypt-key-encryption-configuration-case) is configured, the open platform will push encrypted data, At this time, the data needs to be decrypted, and this method can be called for convenient decryption. (In general, the decryption logic is built into the SDK, and no manual processing is required).
```typescript
import * as lark from '@larksuiteoapi/node-sdk';

new lark.AESCipher('encrypt key').decrypt('content');
````

## Examples
[Rapidly develop auto-responder bot](https://github.com/larksuite/lark-samples/blob/main/react_and_nodejs/robot/README.zh.md)

## Blog
[ISV Application Development Guide](https://bytedance.feishu.cn/docx/RUZKdGwdyoH4KexMJgDcITQnn0b)

## LICENSE
MIT

## Contact Us
Click [Server SDK](https://open.feishu.cn/document/ukTMukTMukTM/uETO1YjLxkTN24SM5UjN) in the upper right corner of the page 【Is this document helpful to you? 】Submit feedback 
