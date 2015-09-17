### React notes
Exceprts from [https://facebook.github.io/react/docs/getting-started.html]

##### Props
You should think of these as immutable within the component. Never write to this.props

You can use JSX spread attributes to merge the old props with additional values:
`<Component {...this.props} more="values" />`

##### JSX
You don't have to use JSX with React - you can create React elements in plain JavaScript using React.createElement (which takes a tag name or component, a properties object, and variable number of optional child arguments).
For convenience, you can create short-hand factory functions to create elements from custom components.

##### [https://facebook.github.io/react/docs/jsx-in-depth.html](Namespaced components)
If your component has a lot of children, make an umbrella component which contains the others as attributes.


##### [https://facebook.github.io/react/docs/jsx-in-depth.html](Spread attributes)
Use spread attributes (`...props`) to pass in all the props in your object to a component. You can also add other attributes.

##### State
Duplicated data from props should not go in state; try to use props as the source of truth. One valid use to store props in state is to be able to know its previous values, because props can change over time.

Whole (useful) chunk copied from the docs:
A common way to inform React of a data change is by calling setState(data, callback). This method merges data into this.state and re-renders the component. When the component finishes re-rendering, the optional callback is called. Most of the time you'll never need to provide a callback since React will take care of keeping your UI up-to-date for you.

##### Children
With children, React does some funny business to render them with ease (called 'reconciliation'). This may include 'clobbering', which means:

* eg - I have two paragraphs, the first of which I want to delete. To save memory (?) React will DOM diff in an order, and remove the second paragraph, but replace the text of the first para with the text of the second so it looks like the first has been removed.

This is an issue when your children are stateful. You then need to give them keys.

Keys should be assigned to the child component, and not to the HTML container.

Edge case: For reordering two (or more) sets of children (siblings) you can use createFragment https://facebook.github.io/react/docs/create-fragment.html

##### Speed
As JS is fast and the render() methods are quite simple, your application should be fast. What's most likely to slow it down is the DOM mutation (rather than to JS execution). You can speed things up by telling React to skip processing a subtree. Do this by overriding shouldComponentUpdate() to return false. But, y'know…not in a case where data has actually been changed.

#### Component lifecycle

| Type          | Component name  | Pre initial render  |  Notes            |
| ------------- | --------------- |---------------------|-------------------|
| Mounting      | componentWillMount       | Yes    | Set state before initial render.|
| Mounting      | componentDidMount        | No     | Immediately after initial render. Now the component has a DOM node. The componentDidMount of the child components are invoked before parents.|
| Updating      | componentWillReceiveProps| No     | Call setState() inside this method to update props just before the render. |
| Updating      | shouldComponentUpdate | No    | This method is invoked before render, when new state / props recieved. An opportunity to return false when you know the new props & state will ont need to ause a component update. Render will be completely skipped until the next state change. Also, componentWillUpdate & componentDidUpdate won't be called. Using this method will speed up your app if performance is a bottleneck.    |
| Updating     | componentWillUpdate | No | Invoked immediately before render / after new state/props are received. Cannot use this setState() here - if state needs updating in response to a prop change, use componentWillReceiveProps instead). |
| Updating | componentDidUpdate | No | Invoked immediately after the component's updates are put in the DOM. Opportunity to do something with the DOM straight after an update. |
| Unmounting | componentWillUnmount | - | Invoked immediately before a component is unmounted from the DOM. USe this method for cleanup - eg invalidate timers or clear any DOM elements that were created in componentDidMount. |