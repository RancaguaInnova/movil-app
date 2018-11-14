const sectionIcon = (section, focused) =>{
    let iconName = '';
    switch (section) {
        case 'Integrations':
            iconName = `ios-apps${focused ? '' : '-outline'}`
            break;
        case 'Calendar':
            iconName = `ios-calendar${focused ? '' : '-outline'}`
            break;
        case 'News':
            iconName = `ios-notifications${focused ? '' : '-outline'}`
            break;
        case 'Home':
            iconName = `ios-home${focused ? '' : '-outline'}`
            break;
        case 'Directory':
            iconName = `ios-information-circle${focused ? '' : '-outline'}`
            break;
        case 'Profile':
            iconName = `ios-person${focused ? '' : '-outline'}`
            break;
        default:
            iconName = `ios-apps${focused ? '' : '-outline'}`
            break;
    }
    return iconName;
};


export {
    sectionIcon
};