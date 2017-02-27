import * as builder from 'botbuilder';
import { UserStates } from './Model/Consts';
import { BlisDebug} from './BlisDebug';

export class BlisUserState {

    // Application Id
    appId : string;

    // Dialog session Id
    sessionId? : string;

    // Training model to use
    modelId? : string;

    // In teach Model
    inTeach? : boolean;

    public static Get(bot : builder.UniversalBot, address : builder.IAddress, defaultApp : string,
                        cb : (err: Error, state: BlisUserState, isNew : boolean) => void )  {

        bot.loadSession(address, (error, session) => 
        {
            if (error) {
                cb(error, null, null);
            }
            else if (!session.userData.Blis)
            {
                session.userData.Blis = {};
                session.userData.Blis[UserStates.APP] = defaultApp;
                session.userData.Blis[UserStates.MODEL] = null;
                session.userData.Blis[UserStates.SESSION] = null;
                session.userData.Blis[UserStates.TEACH] = false;
                cb(null, session.userData.Blis, true);
            }
            else {
                cb(null, session.userData.Blis, false);
            }
        });
    }

    public static Save(bot : builder.UniversalBot, address : builder.IAddress, userData : BlisUserState)  
    {
        bot.loadSession(address, (error, session) => 
        {
            if (error) {
                BlisDebug.Log(error);
            }
            else 
            {
                if (!session.userData.Blis)
                {
                    session.userData.Blis = {};
                }
                session.userData.Blis[UserStates.APP] = userData[UserStates.APP];
                session.userData.Blis[UserStates.MODEL] = userData[UserStates.MODEL];
                session.userData.Blis[UserStates.SESSION] = userData[UserStates.SESSION];
                session.userData.Blis[UserStates.TEACH] = userData[UserStates.TEACH];
                session.save();
            }
        });
    }
}

