# analytics_dashboard
An AngularJS analytics dashboard with the ability to split it into multiple panes and add different charts in each pane.

# About

This app is a demonstration of the powers of Angular's directives. Making a complex UI such as a dashboard can be made a lot easier using Angular's directives and the beauty of watchers.

# Requirements

You need git to clone this repository. You can get git from http://git-scm.com/.

# Running

git clone https://github.com/nishankjain/analytics_dashboard.git

Open index.html in your browser.

# Directives

Although quite confusing to get a hold of in the first few tries, Angular's directives prove to be quite powerful once you understand how they work and start writing and using them. To create a pane on the dashboard, I have just included the attribute directive 'cards-div' having its own scope (scope=true) which inherits from its parent scope but does not reflect changes back in the parent scope. This enables us to have multiple chart panes with unique IDs and unique scopes but all of thes scopes inherit from the parent scope.

If you use scope=false, all the created panes will have the same scope and you will not be able to make multiple charts as all changes to that scope will be reflected in the pane which has the chart already drawn.

If you use scope={}, an isolated scope will be created for each pane. On why that doesn't work for plotting charts, read this -> http://codetunnel.io/isolate-scopes-explained/.

There's another directive which listens for the change in chart type and updates the currently active chart pane and does not touch the other panes.

There are two other directives: splitHori and splitVert, both of which split the currently active pane into two and simultaneously create a new scope for the new pane which is a consequence of the $compile service used for the addition of the new pane.

If you want to see what happens when you change the scope values in the directive, try and play around with the values and console.log the scope values and compare them to get a better understanding of inheritance.

# Charting

A second part of this app is a way to visualize data (frequency of letters in the English language in this case) which is quite fun to do with d3.js. Since this is just a demonstration, there are no animations or dynamic data entries but you can definitely set up a server to get data dynamically using AJAX calls and see the full power of D3 in action.
