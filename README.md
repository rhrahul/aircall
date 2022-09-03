## Design and Develop

![app-demo](https://github.com/rhrahul/aircall/blob/785b2e7c566926041884edb23b35621a64b2cfc5/App%20Demo.gif)

It was a little bit challenging at first because of vanilla react with webpack. But I quickly figured out things and started working on it.

 1. **UI Design:** I did a little bit of research on what exactly this app is trying to achieve and then I realised many things which were not clear to me before. And I also studied few similar apps. 
 2. **My Approach :** I wanted to do something simple and colorful, so I started designing in sketch and finally came up with the design to implement.
 3. **Implementation:** I used mainly [tailwind-css](https://tailwindcss.com/) for styling (This is only second time I am using tailwind-css, but I'm already familiar with it now). Then for UX I chose [Framer Motion](https://www.framer.com/motion/) library because I was familiar with it and it was easy for me to pick up again. For icons I've use [flaticon uicons](https://www.flaticon.com/uicons) (Huge thanks to them). I've also used [react-tooltip](https://www.npmjs.com/package/react-tooltip) component.
 4. **Result:** [(Click Here for Result)](https://63126668f972d200091aa410--celebrated-pavlova-b2f37b.netlify.app/) I am very happy with the result overall but I didn't had enough time to write tests just because most of my time was utilized in coming up with the design.


## Summary

The goal of this test is to make you code a small ReactJS app. We have prepared a skeleton app for you, but please change whatever you want (CSS files, HTML structure, JS structure, etc).

The app will have two different components:
- **Activity Feed** - simple list of calls
- **Activity Detail** - detail of a call
- **Archive** - the final user should be able to archive (and unarchive) a call. Archived calls will no longer be displayed on the Activity Feed and should have a separate Archived Tab.

Show us what you can do in 24 hours. You will be assessed on the following parameters: 
- Focus on design (Pay attention to the UI/UX and transitions)
- Best React Practices
- Code Readability and Maintainability

## Submission
After you're done with the assignment, please submit a link to the **GitHub/Bitbucket repository** (make sure it's public) with your code **AND** a deployment link where our recruiters can interact with the live version. You can use freely available tools like **Netlify, Vercel, Heroku, etc** to deploy your React application.

**Note:** Submissions without a valid repository and deployment link will be removed from any further consideration.

To give you an idea, here's what our app looks like:


![app](https://user-images.githubusercontent.com/630714/29357034-763d7216-8276-11e7-8bcb-e77d9645dfcc.png)

## Installation

We're using [yarn](https://yarnpkg.com) here (but you can use npm):

```
yarn install
yarn start
```

## API documentation

### Routes

Here is the API address: https://aircall-job.herokuapp.com.

As you can see, it's hosted on a free Heroku server, which means that the first time you will fetch the API, it will take few seconds to answer.

- **GET** - https://aircall-job.herokuapp.com/activities: get calls to display in the Activity Feed
- **GET** - https://aircall-job.herokuapp.com/activities/:id: retrieve a specific call details
- **POST** - https://aircall-job.herokuapp.com/activities/:id: update a call. The only field updatable is `is_archived (bool)`. You'll need to send a JSON in the request body:
```
{
  is_archived: true
}
```
- **GET** - https://aircall-job.herokuapp.com/reset: Reset all calls to initial state (usefull if you archived all calls).

### Call object

- **id** - unique ID of call
- **created_at** - creation date
- **direction** - `inbound` or `outbound` call
- **from** - caller's number
- **to** - callee's number
- **via** - Aircall number used for the call
- **duration** - duration of a call (in seconds)
- **is_archived** - call is archived or not
- **call_type** - can be a `missed`, `answered` or `voicemail` call.
