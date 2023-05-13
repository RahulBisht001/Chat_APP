# Chat App


## Messaging APP Notes

- [ ]  I have to change the normal icons to lord-icon animated icons

### `Higher order Components (HOC)`

In React, a Higher-Order Component (HOC) is a function that takes a component and returns a new component with some additional functionality or behavior.

HOCs are a popular pattern in React because they provide a way to reuse and compose functionality across different components. Instead of duplicating code across multiple components, you can extract common logic into an HOC and wrap the components that need that functionality.

### `Suspense and Lazy`

In React, **`Suspense`** and **`lazy`** are two features that help to optimize the loading of code and data in your application.

**`lazy`** is a function that allows you to load a component lazily, meaning it will only be loaded when it's actually needed. This can help to reduce the initial bundle size of your application, since not all components need to be loaded upfront.

Here's an example of how to use **`lazy`**:

```jsx
const MyLazyComponent = lazy(() => import('./MyLazyComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyLazyComponent />
      </Suspense>
    </div>
  );
}
```

### `useRoutes from react-router-dom`

 **`useRoutes`** is a hook provided by **`react-router-dom`** that allows you to define nested routes in your React application. With **`useRoutes`**, you can define a set of routes that will match against the current URL and render the appropriate components based on the matched route.

Here's an example of how to use **`useRoutes`**:

```jsx
import { useRoutes } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
];

function App() {
  const routing = useRoutes(routes);

  return (
    <div>
      <Header />
      <div>{routing}</div>
      <Footer />
    </div>
  );
}
```

### `Switch Case inside component`

```jsx
switch (index) {
        case 0:
            return '/app'
        case 1:
            return '/group'
        case 2:
            return '/call'
        case 3:
            return '/settings'
        default:
            return '/404'
    }

// same as the normal Switch case in any language
```

### `why react-redux package is used ?`

The `react-redux` package is used to integrate the Redux state management library with React applications. It provides a set of tools and components that allow you to easily connect your React components to a Redux store and update them based on changes in the store.

When you use `react-redux`, you can create a Redux store that holds the state of your application and dispatch actions to update that state. You can then use the `connect` function from `react-redux` to connect your React components to the store and subscribe to changes in the store's state. This allows you to keep your components in sync with the state of your application and update them whenever the state changes.

In addition to the `connect` function, `react-redux` provides a number of other useful tools and components, including the `Provider` component, which allows you to make the Redux store available to all components in your application, and the `useSelector` and `useDispatch` hooks, which provide an alternative way to access the store's state and dispatch actions from within your components.

Overall, `react-redux` makes it much easier to manage the state of your React applications, especially for larger applications that have complex state management requirements.

### `why redux-persist package is used ?`

          

`redux-persist` is a package used in Redux applications to persist and rehydrate the store data between page reloads or browser sessions.

 When you refresh or close a browser window, the data stored in the Redux store is lost, as the store is an in-memory data store. This means that all the data previously saved to the store is lost and the application starts from scratch again. To prevent this, we use `redux-persist` to persist the store data to a storage mechanism (e.g. local storage, async storage, etc.) outside the memory of the application. This enables the application to retrieve and reuse the saved data from the storage mechanism when the application is restarted or reloaded.

`redux-persist` also has options to whitelist or blacklist certain parts of the store that you want to persist or not persist, respectively. Additionally, it supports custom serialization and deserialization of the data in the store to handle non-serializable data types. Overall, `redux-persist` simplifies the task of persisting data in Redux applications and enhances the user experience by retaining the data across sessions.

### `why redux/toolkit package is used ?`

`Redux Toolkit` is a package that simplifies the process of working with Redux. It includes utilities that help simplify many common use cases, such as store setup, creating reducers, immutable updates, and even creating entire "slices" of state at once.

Redux Toolkit also includes the official recommended Redux middleware, called `"redux-thunk,"` along with several other utilities for working with Redux and React. It can help improve the development experience and reduce the amount of boilerplate code needed to work with Redux.

Overall, Redux Toolkit is a powerful tool for developing complex applications that need to manage a lot of state. By simplifying many of the common use cases and including useful utilities, it can help make the development process faster and more efficient.

## `Hooks in React`

`Hooks` are a new feature introduced in React 16.8 that allows developers to use state and other React features without writing a class. They are functions that allow you to use React state and lifecycle methods in functional components.

Here are some of the most commonly used hooks in React:

1. useState() - allows functional components to use state and re-render when the state changes
2. useEffect() - allows functional components to use lifecycle methods like componentDidMount, componentDidUpdate and componentWillUnmount
3. useContext() - allows functional components to use context from a parent component

Hooks make it easier to write and manage React components by reducing the amount of boilerplate code and improving performance.

### `What are State  and LifeCycle Methods in React`

 In React, state is an object that represents the internal state of a component. It is used to store and manage the data that a component needs to render and operate. The state of a component can be changed by calling the `setState` method, which triggers a re-render of the component.

React `lifecycle methods` are special methods that are called at specific points in a component's lifecycle. They allow you to hook into the lifecycle of a component and perform certain actions at different stages. The lifecycle of a React component consists of three phases: mounting, updating, and unmounting. The following are the most commonly used lifecycle methods:


- `componentDidMount`: This method is called when a component is mounted and rendered for the first time. It is used to perform any initialization that needs to be done, such as fetching data from a server.
- `shouldComponentUpdate`: This method is called when a component is about to be updated. It is used to determine whether the component should be re-rendered or not.
- `componentDidUpdate`: This method is called after a component has been updated and re-rendered. It is used to perform any actions that need to be taken after the update, such as updating the DOM or fetching new data.
- `componentWillUnmount`: This method is called when a component is about to be removed from the DOM. It is used to perform any cleanup that needs to be done, such as cancelling timers or removing event listeners.

### `PropTypes`

This imports the **`PropTypes`** library from the **`prop-types`** module. **`PropTypes`** is used for type-checking of React props

```jsx
import PropTypes from 'prop-types'
```

### `useRef() hook`

 The `useRef` hook in React is used to create a reference to an element in the DOM, which can be used to access the underlying DOM node directly. It's a way to store a mutable value in a component that won't trigger a re-render when it's updated.

Here's an example of how to use the `useRef` hook in a React functional component:

```jsx
import React, { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

```

In this example, we first import the `useRef` hook from the React library. We then define a functional component `MyComponent` that creates a reference to an input element using the `useRef` hook.

The `useRef` hook takes an initial value as an argument, which in this case is `null`. We store the reference to the input element in a variable called `inputRef`.

We also define a function called `handleClick` which is triggered when the user clicks on the "Focus Input" button. Inside this function, we call the `focus` method on the `current` property of the `inputRef` object. This causes the input element to be focused.

Finally, in the return statement, we render an input element with a ref that points to `inputRef` and a button that triggers the `handleClick` function when clicked.

By using the `useRef` hook, we can create a reference to the input element and access its properties and methods directly without triggering a re-render. This can be useful in many cases where we need to manipulate the DOM directly from within a React component.

### `Axios`



# `Backend Learnings`

```jsx
app.use(express.urlencoded({
    extended: true,
})) 

app.use(bodyParser.urlencoded({
 extended: true ,
})) 
explain both and differ btw them
```

Both `express.urlencoded()` and `bodyParser.urlencoded()` are middleware functions for parsing URL-encoded data in the body of a request.

`express.urlencoded()` is built-in middleware in Express 4.x, while `bodyParser.urlencoded()` is a separate middleware library that needs to be installed separately. In previous versions of Express (3.x and earlier), `bodyParser` was built-in middleware.

The purpose of these middleware functions is to parse URL-encoded data that is sent in the body of a request, and make it available in the `req.body` object in the form of key-value pairs. URL-encoded data is a way of encoding data in a URL by replacing special characters with their corresponding hexadecimal ASCII code.

The `extended` option in both middleware functions allows for parsing of nested objects in the URL-encoded data. When set to `true`, the URL-encoded data can contain arrays and objects.

The main difference between `express.urlencoded()` and `bodyParser.urlencoded()` is that `express.urlencoded()` is built-in middleware in Express, while `bodyParser.urlencoded()` is a separate middleware library that needs to be installed. In addition, `bodyParser.urlencoded()` provides additional options and configuration settings, such as setting a limit on the size of the URL-encoded data that can be parsed.

In summary, both `express.urlencoded()` and `bodyParser.urlencoded()` are middleware functions for parsing URL-encoded data in the body of a request, but `express.urlencoded()` is built-in middleware in Express while `bodyParser.urlencoded()` is a separate middleware library that provides additional configuration options.

### `C.O.R.S`

CORS stands for `Cross-Origin Resource Sharing`. It is a security mechanism implemented by web browsers that allows web pages from different domains to communicate with each other securely.

CORS is enforced by the browser to prevent malicious scripts on one domain from accessing sensitive data on another domain without the user's knowledge. When a web page tries to make a cross-origin request, the browser first sends a preflight request to the server to check if the server allows such requests. The server then responds with the allowed methods, headers, and origin.

To allow cross-origin requests from a server, the server needs to set the appropriate headers in the HTTP response. These headers include:

- Access-Control-Allow-Origin: Specifies the domains that are allowed to make cross-origin requests to the server.
- Access-Control-Allow-Methods: Specifies the HTTP methods that are allowed for cross-origin requests.
- Access-Control-Allow-Headers: Specifies the HTTP headers that are allowed for cross-origin requests.

In summary, CORS is a security mechanism implemented by web browsers that allows web pages from different domains to communicate with each other securely, and it is enforced by the browser to prevent malicious scripts from accessing sensitive data on another domain.

### `O.R.M Object-Relational Mapping`

ORM stands for Object-Relational Mapping.

ORM is a programming technique that is used to map objects in an object-oriented programming language to data stored in a relational database. It provides a layer of abstraction between the application code and the database, allowing developers to work with objects in their code instead of writing SQL queries directly.

In an ORM, each object in the application is mapped to a corresponding table in the database, and the properties of the object are mapped to columns in the table. The ORM provides methods for creating, updating, and deleting records in the database, as well as querying the database to retrieve records based on specific criteria.

ORMs are used to simplify database access in applications and to make the code more maintainable and scalable. They allow developers to work with objects in their code instead of writing SQL queries directly, which makes the code more readable and easier to maintain.

Some popular ORM frameworks include Sequelize, Hibernate, Django ORM, and Entity Framework.

### `Methods for Passing data in an API call`

Sure, here are the most common methods of passing data in an API call:

1. Query parameters: Data is passed as key-value pairs in the URL after the `?` symbol, separated by `&` symbol.

```bash
<http://example.com/api/v1/users?name=John&age=25>
```

1. Request body: Data is passed in the body of the HTTP request. There are different types of data formats that can be used such as JSON, XML, form data, plain text, etc.

```bash
POST <http://example.com/api/v1/users> HTTP/1.1
Content-Type: application/json

{
  "name": "John",
  "email": "john@example.com",
  "age": 25
}
```

1. URL parameters: Data is passed as a part of the URL path, typically used to identify a specific resource.

```bash
<http://example.com/api/v1/users/1>
```

1. Headers: Data is passed as key-value pairs in the headers of the HTTP request.

```bash
GET <http://example.com/api/v1/users> HTTP/1.1
Accept: application/json
Authorization: Bearer <access_token>
```

1. Cookies: Data is passed as cookies that are stored on the client side and sent with every request to the server.

```bash
GET <http://example.com/api/v1/users> HTTP/1.1
Cookie: session_id=abc123; user_id=12345
```

These are the most common methods of passing data in an API call. The specific method used depends on the requirements of the API and the type of data being passed.

### `Difference btw POST , PUT and PATCH methods`

In web development, POST, PUT, and PATCH are HTTP methods used to modify or create resources on a server. Here's an overview of their differences:

`POST method:`

- The POST method is used to submit an entity to the specified resource, often resulting in the creation of a new resource.
- It is commonly used for submitting form data, uploading files, or creating new records in a database.
- When a request is made using the POST method, the data is submitted as the body of the request and is typically stored on the server.

`PUT method:`

- The PUT method is used to update an existing resource or create a new one if it does not exist.
- It replaces the entire resource with the new data provided in the request.
- If the resource does not exist, the PUT method will create it.
- PUT is often used for updating an entire record in a database.

`PATCH method:`

- The PATCH method is used to partially update an existing resource on the server.
- Unlike the PUT method, it only modifies the specified fields in the resource, leaving the rest of the resource unchanged.
- PATCH is often used for making minor updates to a resource, such as changing the status of a task or updating a user's email address.

In summary, POST is used for creating new resources, PUT is used for updating entire resources, and PATCH is used for making partial updates to existing resources.

### `Redux useDispatch()`

In Redux, the `useDispatch()` hook is used to obtain a reference to the `dispatch` function from the Redux store. The `dispatch` function is used to send an action object to the store, which triggers the state update process and eventually updates the UI based on the new state.

Here's an example of using `useDispatch()`:

```jsx
import { useDispatch } from 'react-redux';
import { increment } from './counterSlice';

function Counter() {
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment());
  }

  return (
    <div>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

In this example, we import the `useDispatch()` hook from the `react-redux` package, along with an action creator function called `increment()` from a `counterSlice` module. We then call `useDispatch()` to obtain a reference to the `dispatch` function, and use it in the `handleIncrement()` function to send the `increment()` action object to the store when the button is clicked.

By using the `useDispatch()` hook, we can easily access the `dispatch` function without having to manually pass it down through props or other means. This helps to keep the code clean and reduces boilerplate.

# `Mongoose`

### `Middleware`

`Reference : [https://tinyl.io/8Wa7](https://tinyl.io/8Wa7)`

In Mongoose, middleware functions are functions that can intercept and modify the data before or after a certain operation (such as `save`, `update`, `delete`) is executed on a MongoDB collection. These functions can be used to add additional functionality to your application, such as validating or modifying data, encrypting data, or triggering other actions when a certain event occurs.

Mongoose middleware can be categorized into two types: `pre` middleware and `post` middleware. Pre middleware functions are executed before the actual operation (such as `save`) is executed, whereas post middleware functions are executed after the operation has completed.

       

For example:  in the code you provided earlier, the `pre('save')` middleware function intercepts the `save` operation on the `User` model and executes some code to hash the `otp` field if it has been modified before saving the document to the database.

### `Mongoose Model`

The `mongoose.model()` method in Mongoose can accept up to three parameters:

1. The name of the collection in the MongoDB database that the model represents.
2. A schema object that defines the structure and data types of the documents that will be stored in the collection.
3. An optional third argument that can be used to customize the behavior of the model, such as adding additional methods or specifying collection-level options.

Here's an example of using `mongoose.model()` with all three parameters:

```jsx
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
});

const options = {
  timestamps: true
};

const UserModel = mongoose.model('User', schema, options)
```

In this example, the model represents the "User" collection in the MongoDB database, with a schema that defines three fields (name, age, and gender) and an optional third argument that specifies that timestamps should be automatically added to each document.

The optional third argument in `mongoose.model()` allows you to specify additional options for the model.

Some common options that you can specify include:

- `collection`: The name of the collection in the database that the model represents. If this option is not specified, Mongoose will use the pluralized, lowercased model name as the collection name.
- `timestamps`: A boolean value that indicates whether Mongoose should automatically add two fields, `createdAt` and `updatedAt`, to each document in the collection. These fields will store the date and time that the document was created and last updated, respectively.
- `strict`: A boolean value that indicates whether Mongoose should enforce a strict schema for the documents in the collection. If set to `false`, Mongoose will allow documents to have fields that are not specified in the schema.
- `validateBeforeSave`: A boolean value that indicates whether Mongoose should automatically validate the document before saving it to the database. If set to `false`, validation will not be performed and documents will be saved regardless of whether they conform to the schema.
- `toJSON`: An object that specifies options for transforming documents to JSON format. For example, you can specify which fields should be included or excluded from the output, or define custom getters or setters for specific fields.

Here's an example of using `mongoose.model()` with the `timestamps` option:

```jsx
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
})
const options = {
  timestamps: true
}
const UserModel = mongoose.model('User', schema, options)
```

In this example, the `timestamps` option is set to `true`, so Mongoose will automatically add `createdAt` and `updatedAt` fields to each document in the "User" collection.

Yes, you can use multiple options together when defining a Mongoose model using `mongoose.model()`. For example, you can define the name of the collection, schema, and multiple options all in one call to `mongoose.model()`:

```jsx
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
}, {
  timestamps: true,
  strict: true,
  collection: 'users',
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
    }
  }
})
const UserModel = mongoose.model('User', schema)
```

In this example, the `mongoose.model()` call defines a model for the "users" collection in the database, with a schema that includes three fields (name, age, and gender). It also sets several options, including `timestamps`, `strict`, `collection`, and `toJSON`.

The `timestamps` option adds `createdAt` and `updatedAt` fields to each document, while the `strict` option enforces the schema strictly so that any fields not defined in the schema will not be saved to the database. The `collection` option specifies the name of the collection in the database to use for this model. Finally, the `toJSON` option specifies that the model should include virtual fields and that the `_id` field should be removed from the JSON representation of the document.

Yes, you can also add options to the `mongoose.model()` call as a third argument, like this:

```jsx
const UserModel = mongoose.model('User', schema, {
  timestamps: true,
  strict: true,
  collection: 'users',
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
    }
  }
})
```

In this example, the options are included as the third argument to the `mongoose.model()` call, and the model for the "User" collection is defined with the specified options.

However, it's important to note that adding too many options to a model definition can make the code harder to read and understand. If you find that your model definition is becoming too complex, it may be a good idea to refactor your code to make it more modular or split it into multiple files.
