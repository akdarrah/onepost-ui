# OnepostUI

OnePost is social media management infrastructure for the internet. Companies use our API to create, post, and manage their social presence via programmatic communication. You can think of it like a headless Hootsuite built for developers. Learn more at [https://www.getonepost.com/](https://www.getonepost.com/).

If you're using the OnePost API to build a web application, use this prebuilt UI to get up and running as quickly as possible.

1. Pick your social accounts (Twitter, Facebook, or Instagram) you want to post to.
2. Add your post's text and/or image. You can preview what your post will look for each social network as you type.
3. Publish your post immediately to all accounts when your post is perfect (or schedule for a later time).

![](https://user-images.githubusercontent.com/69064/109696613-3ec0df80-7b5b-11eb-8f4f-30d0f947fd64.png)

This UI was designed to work with the [OnePost API](https://rapidapi.com/onepost/api/onepost1) hosted on RapidAPI.

## Installation

Install using yarn:

```shell
yarn add onepost-ui
```

Then, import to get access to `OnepostUI`:

```javascript
import OnepostUI from "onepost-ui";
```

## Usage

Take a look at [demo/index.html](https://github.com/akdarrah/onepost-ui/blob/master/demo/index.html) to see a working example.

### Styles

OnepostUI makes use of an `iframe` to render the form. Make sure your `iframe` is styled nicely using CSS. We also use [iframe-resizer](https://github.com/davidjbradshaw/iframe-resizer) to make sure the content of the form is always visible.

```css
iframe {
  border: none;
  width: 1px;
  min-width: 100%;
}
```

### HTML

OnepostUI needs to know where it should be rendered. Add an HTML element somewhere in your page to use as the `target` HTML node:

```html
<div id="onepost-demo"></div>
```

### Javascript

You can get your `publicKey` by [registering for a user account on our website](https://www.getonepost.com/). Then, use the [OnePost API](https://rapidapi.com/onepost/api/onepost1) to add at least one `Provider`, `Authorization`, and `AuthorizedPage` record to your account.

```javascript
var target = document.getElementById("onepost-demo");
var publicKey = "pk-cbe628a0-5538-0139-b375-76de50b5e55c";
var authorizedPageIds = [13, 14, 15];

var onSuccess = function(data){
  console.log("success!", data);
}

var onFailure = function(error){
  console.log("failure...", error.response);
}

var onepost = new OnepostUI(target, publicKey, authorizedPageIds, {
  onSuccess: onSuccess,
  onFailure: onFailure
});

onepost.attach();
```

### Server-side Processing

When registering for a OnePost user account, you will be given a `secret_key` and a `public_key`. It is extremely important that your `secret_key` always remains a secret, and therefore cannot be used in the frontend of your website where it could be exposed to users. As a result, the OnepostUI uses your `public_key` for authentication.

When the OnepostUI is successfully submitted, a `PostIntent` record will be created with a `token` (you will have access to this in the `onSuccess` callback function). When you receive this token, you can submit a request to your web application for server side processing.

Use the [Get a Post Intent endpoint](https://rapidapi.com/onepost/api/onepost1?endpoint=apiendpoint_9476022d-7974-49e0-8d84-aefbd3105894) along with the token from the frontend to fetch the `PostIntent` data. **WARNING: It is extremely important and highly recommend that you compare the `authorized_page_ids` of this record with the `AuthorizedPage`s the user is allowed to post to.** Because of the nature of this architecture, it is possible the user could have modified (or added) an ID they should not have access to (resulting in posting to someone else's account).

Once you are sure the `authorized_page_ids` are correct, use the [Create a Post endpoint](https://rapidapi.com/onepost/api/onepost1?endpoint=apiendpoint_7cae6f56-d9c9-4d9c-8c6f-51d0feccb598) along with your token to create a new `Post` record.

## Development

After checking out the repo, run `yarn install` to install dependencies. Then, run `yarn test` to run the tests. To build the project onto your local machine, run `gulp`. Finally, run `npm publish` to publish a new version to npm.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/akdarrah/onepost-ui. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/akdarrah/onepost-ui/blob/master/CODE_OF_CONDUCT.md).

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Onepost project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/akdarrah/onepost-ui/blob/master/CODE_OF_CONDUCT.md).
