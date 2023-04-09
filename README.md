#Twitter Mini App
This is a mini Twitter app where users can view and post tweets from fake users. Users can react to the posts, and the reaction will only affect the local state. Users can also search for other users and follow or unfollow them. In the profile section, users can see their followers and following lists. All lists have pagination, with an initial page size of 10, and a loader is added for a better user experience. The Twitter logo is used for users and tweets that do not have an available image URL. The app has 6 screens - login, signup, timeline/home, users, my tweets, and profile. The screens share a dynamic component called ApiFlatList, where props are sent to the component, including the API endpoint, the data key for accessing the array object of data from the response, and render keys for accessing those objects. The component uses conditional logic for icons and prefix text, and styles are dynamic. The common styles come from the GlobalStyles component, and additional styles can be passed to the component. Dynamic styles can also be used to replace or add styles.

##Screens
###Login
This screen allows users to log in to the app using their credentials.

###Signup
This screen allows new users to sign up for the app by providing their credentials.

###Timeline/Home
This screen displays a list of tweets from fake users. Users can react to the posts, and the reaction will only affect the local state.

###Users
This screen allows users to search for other users and follow or unfollow them.

###My Tweets
This screen displays a list of the user's own tweets.

###Profile
This screen displays the user's profile information, including their followers and following lists.

###Dynamic Component - ApiFlatList
This component is used in all screens that display a list of data. The props sent to the component include the API endpoint, the data key for accessing the array object of data from the response, and render keys for accessing those objects. The component uses conditional logic for icons and prefix text, and styles are dynamic. The common styles come from the GlobalStyles component, and additional styles can be passed to the component. Dynamic styles can also be used to replace or add styles.

##Conclusion
This mini Twitter app allows users to view and post tweets from fake users, search for and follow other users, and view their own tweets and profile information. Pagination, a loader, and dynamic styling provide a smooth user experience.
