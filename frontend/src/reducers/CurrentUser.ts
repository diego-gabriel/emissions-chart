type CurrentUser = string;

enum CurrentUserActionType {
    SET_USER = 'SET_USER',
    UNSET_USER = 'UNSET_USER',
}

interface SetUserAction {
    type: CurrentUserActionType.SET_USER;
    currentUser: CurrentUser;
}

interface UnsetUserAction {
    type: CurrentUserActionType.UNSET_USER;
}

type CurrentUserAction = SetUserAction | UnsetUserAction;

export const currentUserActions = {
    setCurrentUser: (currentUser: CurrentUser): SetUserAction => ({
        type: CurrentUserActionType.SET_USER,
        currentUser,
    }),
    unsetCurrentUser: (): UnsetUserAction => ({
        type: CurrentUserActionType.UNSET_USER,
    }),
};

export const currentUserReducer = (state: CurrentUser | null = null, action: CurrentUserAction) => {
    switch (action.type) {
        case 'SET_USER':
            return action.currentUser;
        case 'UNSET_USER':
            return null;
        default:
            return state;
    }
};
