import "../styles/RouteManager.css";

import PopupWindow from "./PopupWindow";
import RouteEditor from "./RouteEditor";

import { useState } from "react";

export default function RouteManager() {
    // ---- STATE HOOKS ----
    // userDecision: "yes" -> User wants to **go** to the **RouteTutorial component**
    //               "no" -> User wants to **stay** in the **RouteEditor component**.
    const [userDecision, setUserDecision] = useState('');

    // routesList -> To save the array of routes that the user enters
    const [routesList, setRoutesList] = useState([]);

    // ---- COMPONENT STATE ----
    // routeManagerContent: The content of the RouteManager component.
    //                      If userDecision is "yes" -> RouteTutorial component
    //                      If userDecision is "no" -> RouteEditor component
    //                      If userDecision is "default" -> RouteEditor component behind PopupWindow component
    let routeManagerContent;

    // ---- COMPONENT LOGIC ----
    switch (userDecision) {
        case 'yes':
            routeManagerContent = undefined; // currently undefined - will be changed when we implement the RouteTutorial component
            break;

        case 'no':
            routeManagerContent = (
                <RouteEditor 
                routesList={routesList}
                setRoutesList={setRoutesList} />
            );
            break;

        default:
            routeManagerContent = (
                <>
                    <RouteEditor 
                        routesList={routesList}
                        setRoutesList={setRoutesList}
                    />;
                    <PopupWindow
                        type={"question"}
                        title={"Stage X: Managing Your Business Routes"}
                        mainContent={"Would you like first to receive a tutorial on how to use the Route Editor?"}
                        buttonsKey={['yes', 'no']}
                        buttonsContent={['Yes (activate tutorial mode)', 'No (just stay in the editor)']}
                        setUserDecision={setUserDecision}
                    />
                </>
            );
    }

    // ---- COMPONENT RENDER ----
    return (
        <div className="route-manager">
            <header className="route-manager__header">
                <h1>Route Manager</h1>
            </header>
            {routeManagerContent}
            <footer className="route-manager__footer">
                <button>Tutorial</button>
                <button>Continue to the next stage</button>
            </footer>
        </div>
    );
}