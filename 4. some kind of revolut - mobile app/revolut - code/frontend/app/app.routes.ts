export enum AppRoutes {
    home = 'home',
    login = 'login',
    friends = 'friends',
    register = 'register',
    top_up = 'top_up',
   // groups = 'groups',
    transfer = 'transfer',
    pay = 'pay',
    change = 'change',
    // TODO: remove it
    //nfl_crimes = 'nfl_crimes'
}

export const AppRouteTitles = {
    [AppRoutes.home]: 'Home',
    [AppRoutes.login]: 'Login',
    [AppRoutes.friends]:'Friends',
    [AppRoutes.register]: 'Register',
    [AppRoutes.change]: 'Piggy Bank',

    [AppRoutes.pay]:'Pay',
   // [AppRoutes.groups]:'Groups',
    [AppRoutes.top_up]: 'Top Up Account',
    [AppRoutes.transfer]: 'Transfer Money to an Account',
    // TODO: remove this
    //[AppRoutes.nfl_crimes]: 'NFL DUI Infractions'
};
